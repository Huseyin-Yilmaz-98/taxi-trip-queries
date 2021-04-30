import express = require("express");

type Params = {
  startDate: string | number;
  endDate: string | number;
  locationId: number;
};

export default async (req: express.Request, res: express.Response) => {
  try {
    const prisma = req.prisma;
    const { startDate, locationId, endDate }: Params = req.body;

    const trips = await prisma.trip.findMany({
      where: {
        AND: [
          {
            tripDate: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
          {
            pickUpLocationId: {
              equals: locationId,
            },
          },
        ],
      },
      include: {
        pickUpZone: true,
        dropOffZone: true,
      },
    });
    res.status(200).json(trips);
  } catch (err) {
    res.status(400).json(err);
  }
};
