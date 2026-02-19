import http from "http";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { dataSetRoutes } from "./api/dataSet/dataSet.routes.js";
const app = express();

// Express App Config
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5176",
    "http://localhost:5176",
  ],
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/api/dataSet", dataSetRoutes);

const port = process.env.PORT || 3033;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
