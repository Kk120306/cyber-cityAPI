const express = require('express');

const boardRouter = require('./routes/BoardRouter');
const gameRouter = require('./routes/GameRouter');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/leaderboard", boardRouter);
app.use("/game", gameRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});