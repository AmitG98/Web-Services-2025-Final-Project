const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use((req, res) => {
    res.status(404).send("Page wasn't found");
});

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});