const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./db/connection_db');
const path = require('path');
const { fileURLToPath } = require('url');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "../public")));

connectDB();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
    res.status(404).send("Page wasn't found");
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});









