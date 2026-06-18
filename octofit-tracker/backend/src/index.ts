import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import workoutsRouter from "./routes/workouts";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit";

// Codespaces-aware allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];
if (process.env.CODESPACE_NAME) {
  // A best-effort public preview URL for Codespaces (may vary by environment)
  const cs = process.env.CODESPACE_NAME;
  allowedOrigins.push(`https://${cs}-8000.githubpreview.dev`);
  allowedOrigins.push(`https://${cs}-5173.githubpreview.dev`);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  }
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OctoFit Tracker backend running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use('/api/workouts', workoutsRouter);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      if (process.env.CODESPACE_NAME) {
        const cs = process.env.CODESPACE_NAME;
        console.log(`Codespaces preview (approx): https://${cs}-8000.githubpreview.dev`);
      }
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();
