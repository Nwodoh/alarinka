const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking/bookingController");

router.route("/").patch(bookingController.updateStatus);
router.route("/:booker").get(bookingController.getAllBookings);
router.route("/payments/:owner").get(bookingController.getPayments);

module.exports = router;
