import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

async function startMongo() {
  await mongoose.connect(process.env.MONGODB_URI + "neuranaut");
  console.log("DB Connected Successfully.");
}

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is listening on PORT ${PORT}`);
  await startMongo();
});
