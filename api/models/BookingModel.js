const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    numGuests: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["accepted", "unseen", "pending"],
      default: "unseen",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.index({ place: 1, booker: 1 }, { unique: true });

bookingSchema.virtual("totalPrice").get(function () {
  return this.numGuests * this.place.price;
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
