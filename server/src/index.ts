import { PrismaClient } from '@prisma/client';
import express = require("express");
import trips from "./routes/trips";
import zones from "./routes/zones";
import http from "http";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, _, next) => {
    req.prisma = prisma;
    next();
})

app.use("/trips", trips);
app.use("/zones", zones);

http.createServer(app).listen(4444);