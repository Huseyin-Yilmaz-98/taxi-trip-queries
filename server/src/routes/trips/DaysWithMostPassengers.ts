import express = require("express");

export default async (req: express.Request, res: express.Response) => {
  try {
    const prisma = req.prisma;
    const trips = await prisma.trip.groupBy({
      by: ["tripDate"],
      sum: {
        passengerCount: true,
      },
      count: {
        id: true,
      },
    });
    trips.sort(
      (a, b) => (b.sum.passengerCount || 0) - (a.sum.passengerCount || 0)
    );
    res.status(200).json(trips.slice(0, 5));
  } catch (err) {
    res.status(400).json(err);
  }
};
