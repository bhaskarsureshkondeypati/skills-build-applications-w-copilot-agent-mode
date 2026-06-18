import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutsRouter from "./routes/workouts";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OctoFit Tracker backend running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use('/api/workouts', workoutsRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
