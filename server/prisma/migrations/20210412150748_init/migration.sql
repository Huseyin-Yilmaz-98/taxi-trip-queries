-- CreateTable
CREATE TABLE "zone" (
    "id" INTEGER NOT NULL,
    "borough" VARCHAR(200) NOT NULL,
    "zone" VARCHAR(200) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip" (
    "id" SERIAL NOT NULL,
    "picked_up_at" TIMESTAMP NOT NULL,
    "dropped_off_at" TIMESTAMP NOT NULL,
    "passenger_count" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "pick_up_location_id" INTEGER NOT NULL,
    "drop_off_location_id" INTEGER NOT NULL,
    "fare_amount" DOUBLE PRECISION NOT NULL,
    "extra" DOUBLE PRECISION NOT NULL,
    "mta_tax" DOUBLE PRECISION NOT NULL,
    "tip" DOUBLE PRECISION NOT NULL,
    "tolls" DOUBLE PRECISION NOT NULL,
    "improvement_surcharge" DOUBLE PRECISION NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "congestion_surcharge" DOUBLE PRECISION NOT NULL,
    "trip_date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trip" ADD FOREIGN KEY ("pick_up_location_id") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip" ADD FOREIGN KEY ("drop_off_location_id") REFERENCES "zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
