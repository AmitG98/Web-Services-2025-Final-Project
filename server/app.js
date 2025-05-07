const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const connectDB = require('./db/connection_db');
connectDB();

const authRoutes = require('./routers/authRoutes');
const profileRoutes = require('./routers/profileRoutes');
const programRoutes = require('./routers/programRoutes');
const reviewRoutes = require("./routers/reviewRoutes");
const myListRoutes = require('./routers/myListRoutes');
const logRoutes = require("./routers/logRoutes");
const recommendationRoutes = require("./routers/recommendationRoutes");
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(cors({ origin: ["http://localhost:3000","https://web-services-2025-final-project.netlify.app"], credentials: true }));
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://web-services-2025-final-project.netlify.app",
    "https://webservices-2025-final-project.onrender.com",
    "https://webservices-2025-final-project.netlify.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/programs', programRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/myList', myListRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use((req, res) => {
  res.status(404).send("Page wasn't found");
});

app.get("/debug", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/yellow.png"));
});

app.use(errorHandler);

module.exports = app;
