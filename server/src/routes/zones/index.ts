import express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const prisma = req.prisma;
  prisma.zone
    .findMany({
      include: {
        tripsWithThisEndingPoint: true,
        tripsWithThisStartingPoint: true,
      },
    })
    .then((zones) => {
      const usedZones = zones
        .filter((zone) => zone.tripsWithThisStartingPoint.length > 0)
        .map((zone) => {
          const {
            tripsWithThisStartingPoint,
            tripsWithThisEndingPoint,
            ...zones
          } = zone;
          return zones;
        });
      res.status(200).json(usedZones);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default router;
