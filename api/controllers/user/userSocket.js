const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Place = require("../../models/Place");
const timeManager = require("../../utilities/TimeManager");
const { parseCookies } = require("../../utilities/helpers");
const { JWT_SECRET } = process.env;

exports.createPlace = async (socket, queryObj) => {
  try {
    const { title, address, price, checkIn, checkOut, maxGuests, owner } =
      queryObj;
    queryObj.checkIn = timeManager.timeToNumber(checkIn);
    queryObj.checkOut = timeManager.timeToNumber(checkOut);

    if (!(title && address && price && checkIn && checkOut && maxGuests))
      throw new Error(
        "Incomplete details. Please fill all the required feilds of the form"
      );

    const newPlace = await Place.create(queryObj);
    socket.broadcast.emit("new update", newPlace);
    socket.emit("created new place");
  } catch (err) {
    // console.log(err);
    socket.emit("create place error", {
      status: "error",
      message: err.message,
    });
  }
  return;
};
