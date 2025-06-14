const express = require("express");
const router = express.Router();

const boardController = require("../controllers/BoardController");

router.post("/addTime", boardController.addTime);
router.get("/leaders", boardController.getLeaders);

module.exports = router;