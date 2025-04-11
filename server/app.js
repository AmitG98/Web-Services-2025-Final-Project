const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const connectDB = require('./db/connection_db');
connectDB();

const authRoutes = require('./routers/authRoutes');
// const userRoutes = require('./routers/userRoutes');
const profileRoutes = require('./routers/profileRoutes');
// const reviewRoutes = require('./routers/reviewRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
// app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).send("Page wasn't found");
});

app.use(errorHandler);

module.exports = app;
