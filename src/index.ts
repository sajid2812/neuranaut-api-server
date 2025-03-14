import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { MONGODB_URI, PORT } from "./config";

import contentRouter from "../src/routes/content.route";
import linkRouter from "../src/routes/link.route";
import tagRouter from "../src/routes/tag.route";
import userRouter from "../src/routes/user.route";

async function startMongo() {
  await mongoose.connect(MONGODB_URI + "neuranaut");
  console.log("DB Connected Successfully.");
}

const app = express();
const port = parseInt(PORT) || 3000;

app.use(express.json());
app.use(cors())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/tags", tagRouter);

app.listen(port, async () => {
  console.log(`Server is listening on PORT ${port}`);
  await startMongo();
});
