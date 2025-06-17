const express = require("express");
const router = express.Router();

const gameController = require('../controllers/GameController');

router.post("/start", gameController.startGame);
router.post("/click", gameController.checkClick);
router.get("/progress", gameController.getProgress);


module.exports = router;