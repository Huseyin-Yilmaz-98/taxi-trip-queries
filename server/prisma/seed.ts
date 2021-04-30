import { PrismaClient } from '@prisma/client'
import zones from "./zones.json";
import trips from "./trips.json"
const prisma = new PrismaClient()


async function main() {
    console.log(`${(await prisma.trip.deleteMany()).count} records have been deleted from the trips table.`);
    console.log(`${(await prisma.zone.deleteMany()).count} records have been deleted from the zones table.`);

    const zone = await prisma.zone.createMany({
        data: [...zones]
    });

    console.log(`${zone.count} zones have been inserted.`);

    const trip = await prisma.trip.createMany({
        data: trips.map(el => {
            return {
                ...el,
                pickedUpAt: new Date(el.pickedUpAt),
                droppedOffAt: new Date(el.droppedOffAt),
                tripDate: new Date(el.pickedUpAt.split(" ")[0])
            }
        })
    });

    console.log(`${trip.count} trips have been inserted.`);

}


main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })