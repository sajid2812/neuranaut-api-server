import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import contentRouter from "../src/routes/content.route";
import linkRouter from "../src/routes/link.route";
import tagRouter from "../src/routes/tag.route";
import userRouter from "../src/routes/user.route";

async function startMongo() {
  await mongoose.connect(process.env.MONGODB_URI + "neuranaut");
  console.log("DB Connected Successfully.");
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/tags", tagRouter);

app.listen(PORT, async () => {
  console.log(`Server is listening on PORT ${PORT}`);
  await startMongo();
});
