import express = require("express");

type Params = {
  date: string | number;
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const prisma = req.prisma;
    const { date }: Params = req.body;
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    const trips = await prisma.trip.findMany({
      where: {
        pickedUpAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        pickUpZone: true,
        dropOffZone: true,
      },
      orderBy: {
        distance: "desc",
      },
      take: 1,
    });

    if (trips.length < 1) {
      throw "No trips were found on this date!";
    } else {
      res.status(200).json({
        trip: trips[0],
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
