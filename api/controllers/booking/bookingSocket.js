const Booking = require("../../models/BookingModel");
const BookingModel = require("../../models/BookingModel");
const Email = require("../../utilities/Email");

exports.createBooking = async (socket, queryObj) => {
  try {
    const { place, owner, user } = queryObj;
    if (!place._id || !owner._id || !user._id)
      throw new Error(
        "Unable to create this booking. Please refresh and try again."
      );

    const newBooking = await BookingModel.create({
      place: place._id,
      owner: owner._id,
      booker: user._id,
    });

    const emailTransporter = new Email({
      place,
      owner,
      user,
    });
    await emailTransporter.sendBookedPlace();
    await emailTransporter.setProp("to", owner.email).sendBookedMyPlace();
    socket.emit("place booked", {
      message: `Your spot at ${place.title} has been booked successfully`,
    });
  } catch (err) {
    let errMessage = err.message;
    if (err.code === 11000)
      errMessage =
        "You have already booked this place and it is currently pending or have been accepted";
    socket.emit("create booking error", { message: errMessage });
    console.log(err);
  }
};

exports.updateStatus = async (socket, queryObj) => {
  const { status, bookingId } = queryObj;
  console.log({ status, bookingId });

  if (status === "accepted") {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "accepted" },
      { new: true }
    )
      .populate("booker")
      .populate("place");
    socket.emit("updated booking", booking);
  } else {
    await Booking.deleteOne({ _id: bookingId });
    return socket.emit("deleted booking", bookingId);
  }
};
