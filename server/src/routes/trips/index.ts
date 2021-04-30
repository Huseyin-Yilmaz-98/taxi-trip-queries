import express = require("express");
import getDaysWithMostPassengers from "./DaysWithMostPassengers";
import tripsByDatesAndLocation from "./TripsByDatesAndLocation";
import longestTripByDay from "./LongestTripByDay";

const router = express.Router();

router.get("/days-with-most-passengers", getDaysWithMostPassengers);
router.post("/trips-by-dates-and-location", tripsByDatesAndLocation);
router.post("/longest-trip-by-day", longestTripByDay);
export default router;