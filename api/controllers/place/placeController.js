const Place = require("../../models/Place");
const catchAsync = require("../../utilities/catchAsync");
const AppError = require("../../utilities/AppError");

exports.getAllPlaces = catchAsync(async (req, res, next) => {
  const allPlaces = await Place.find();
  res.status(200).json({
    status: "success",
    places: allPlaces,
  });
});

exports.getPlace = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const place = await Place.findOne({ slug }).populate("owner");
  res.status(200).json({
    status: "success",
    place,
  });
});