const prisma = require('../config/prismaConfig');

async function addTime(req, res) {
    const { name, sessionId } = req.body;

    if (!name) {
        return res.status(400).json({ error: "No name has been provided." });
    }

    let timeTaken;

    try {
        const session = await prisma.gameSession.findFirst({
            where: { id: parseInt(sessionId) }
        });

        if (!session || !session.startedAt || !session.completedAt) {
            return res.status(404).json({ error: "Session not found or incomplete." });
        }

        timeTaken = Math.floor(
            (new Date(session.completedAt) - new Date(session.startedAt)) / 1000
        );
    } catch (err) {
        console.error("Error finding session:", err);
        return res.status(500).json({ error: "Failed to process time taken." });
    }

    try {
        await prisma.leaderboard.create({
            data: {
                name,
                time : timeTaken
            }
        });
        return res.status(200).json({ success: true, timeTaken });
    } catch (err) {
        console.error("Error saving to leaderboard:", err);
        return res.status(500).json({ error: "Failed to save score." });
    }
}

async function getLeaders(req, res) {
    const limit = 5;
    try {
        const players = await prisma.leaderboard.findMany({
            orderBy: { time: "asc" },
            take: limit,
        })

        console.log(players);


        res.status(200).json({
            players,
            message: "Successful"
        })
    } catch (err) {
        console.error("Error retrieving leaderboard: ", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {
    addTime,
    getLeaders
}