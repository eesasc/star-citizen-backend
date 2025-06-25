const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const Session = require("./models/Session");

app.post("/api/:player/start", async (req, res) => {
  const { player } = req.params;
  const session = new Session({
    player,
    activity: "total",
    duration: 0,
  });
  await session.save();
  res.json({ sessionId: session._id });
});

app.post("/api/:player/activity", async (req, res) => {
  const { player } = req.params;
  const { activity, duration } = req.body;

  const session = new Session({
    player,
    activity,
    duration,
  });
  await session.save();
  res.json({ message: "Activity saved" });
});

app.get("/api/:player/summary", async (req, res) => {
  const { player } = req.params;
  const sessions = await Session.find({ player });

  const summary = sessions.reduce((acc, s) => {
    acc[s.activity] = (acc[s.activity] || 0) + s.duration;
    return acc;
  }, {});
  res.json(summary);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
