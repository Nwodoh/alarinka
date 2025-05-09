const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const catchAsync = require("../../utilities/catchAsync");
const AppError = require("../../utilities/AppError");
const redis = require("../../utilities/MockRedis");
const { generateRandomToken } = require("../../utilities/helpers");
const Email = require("../../utilities/Email");

const bcryptSalt = bcrypt.genSaltSync(10);

const signToken = (claims) => {
  return jwt.sign(claims, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (res, user, statusCode) => {
  const token = signToken({ id: user._id, name: user.name });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    secure: true, // SET TO TRUE when a ssl is acquired.
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    user,
  });
};

exports.sendEmailOtp = catchAsync(async (req, res, next) => {
  const { email, name = "user" } = req.body;
  const otpType = req.query?.otpType || "verify-email";
  if (!email)
    return next(
      new AppError(
        "Please provide your email address to get a verification email.",
        400
      )
    );

  const token = generateRandomToken();
  const emailKey = process.env.EMAIL_CACHE_KEY + email;
  await redis.set(emailKey, token, "ex", process.env.REDIS_VERIFICATION_EXP);

  try {
    console.log({ emailKey, token });
    await new Email({
      user: { email, name },
      otp: token,
    })[
      otpType === "verify-email"
        ? "sendEmailVerificationOTP"
        : "sendPasswordReset"
    ]();
  } catch (err) {
    console.error(err);
    return next(
      new AppError(
        "There was a short server error, please try again and if problem persist, contact the Alarinka customer service."
      )
    );
  }

  res.status(200).json({
    status: "success",
    message: `6 digit otp has been sent to ${email}.\nThis might take some minute.`,
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, otp } = req.body;
  if (!name) return next(new AppError("No name specified"), 401);
  if (!email) return next(new AppError("No email specified"));
  if (!password) return next(new AppError("No password specified"));

  const emailKey = process.env.EMAIL_CACHE_KEY + email;
  const originalToken = await redis.get(emailKey);

  if (!originalToken) return next(new AppError("Your token expired.", 404));

  if (otp !== originalToken)
    return next(new AppError("Incorrect token. Try again."));

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    createSendToken(res, userDoc, 201);
  } catch (err) {
    if (err.code === 11000)
      return next(
        new AppError(
          "User already exist with the email. Log in if it's yours",
          401
        )
      );
    return next(new AppError(err.message, 401));
  }
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      req.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email }).select("+password");
  if (!userDoc)
    return next(
      new AppError(
        `No account exist with your email (${email}). Register now!`,
        404
      )
    );

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (!passOk)
    return next(new AppError(`Incorrect password or email address.`, 406));

  createSendToken(res, userDoc, 200);
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return res.status(200).json({
    status: "success",
  });
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, otp } = req.body;

  if (!password || !passwordConfirm)
    return next(
      new AppError("Please provide a new password and Password confirmation")
    );

  if (password !== passwordConfirm)
    return next(
      new AppError("Your new password is different from your password confirm")
    );

  const emailKey = process.env.EMAIL_CACHE_KEY + email;
  const originalToken = await redis.get(emailKey);

  if (!originalToken) return next(new AppError("Your token expired.", 404));

  if (otp !== originalToken)
    return next(new AppError("Incorrect token. Try again."));

  const user = await User.findOne({
    email,
  });
  if (!user)
    return next(
      new AppError(`No user was found with the email: ${email}`, 400)
    );

  user.password = bcrypt.hashSync(password, bcryptSalt);

  await user.save();

  createSendToken(res, user, 201);
});
