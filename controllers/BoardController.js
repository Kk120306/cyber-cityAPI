const prisma = require('../config/prismaConfig');

async function addTime(req, res) {
    const { name, time } = req.body;

    if (!name) {
        return res.status(400).json({ error: "No name has been provided."});
    }

    try {
        await prisma.leaderboard.create({
            data:
            {
                name,
                time
            }
        })
    } catch (err) {
        console.error("There was a error processing your score: ", err)
        res.status(500).json({ error: "Something went wrong" });
    }
}

async function getLeaders(req, res) {
    const limit = 5;
    try {
        const players = await prisma.leaderboard.findMany({
            orderBy: { updatedAt: "desc" },
            take: limit,
        })
    } catch (err) {
        console.error("Error retrieving leaderboard: ", err);
        res.status(500).json({ error : "Something went wrong"});
    }
}

module.exports = {
    addTime,
    getLeaders
}