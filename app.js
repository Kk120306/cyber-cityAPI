const express = require('express');
const cors = require('cors');


const boardRouter = require('./routes/BoardRouter');
const gameRouter = require('./routes/GameRouter');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://bloginsights-kk120306.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use("/leaderboard", boardRouter);
app.use("/game", gameRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});