const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth/authController");
const userController = require("../controllers/user/userController");

router.route("/").get(authController.isLoggedIn, userController.getProfile);
router.route("/register").post(authController.register);
router.route("/register/otp").post(authController.sendEmailOtp);
router.route("/reset-password").post(authController.resetPassword);
router.route("/login").post(authController.login);
router
  .route("/upload/image")
  .post(userController.upload.array("photos", 100), userController.uploadImage);
router.route("/upload/link").post(userController.uploadImageViaLink);
router.route("/logout").get(authController.logout);

module.exports = router;
