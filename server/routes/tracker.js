
const express = require('express');
const Session = require('../models/Session');
const router = express.Router();

router.post('/log', async (req, res) => {
  const { activity, startTime, endTime } = req.body;
  try {
    const session = await Session.create({
      userId: req.user.userId,
      activity,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.get('/summary', async (req, res) => {
  const { month, year } = req.query;
  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 1);

  const sessions = await Session.find({
    userId: req.user.userId,
    startTime: { $gte: from, $lt: to }
  });

  const totalSeconds = sessions.reduce((sum, s) => {
    return sum + (new Date(s.endTime) - new Date(s.startTime)) / 1000;
  }, 0);

  res.json({ totalSeconds });
});

module.exports = router;
