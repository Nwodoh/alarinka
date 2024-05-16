const express = require("express");
const router = express.Router();

const placeController = require("../controllers/place/placeController");

router.route("/").get(placeController.getAllPlaces);
router.route("/:slug").get(placeController.getPlace);

module.exports = router;
