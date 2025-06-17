const prisma = require("../config/prismaConfig");

async function startGame(req, res) {
    const playerName = req.body.playerName;

    if (!playerName) {
        return res.status(400).json({ error: "Name cannot be empty" });
    }

    try {
        const session = await prisma.gameSession.create({
            data: { playerName }
        });

        return res.status(200).json({
            success: true,
            message: "Game Started!",
            sessionId: session.id
        });
    } catch (err) {
        console.error("Error starting game:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

async function checkClick(req, res) {
    const { relX, relY, name, sessionId: sessionIdRaw } = req.body;
    const sessionId = parseInt(sessionIdRaw, 10);

    if (relX == null || relY == null || !name || isNaN(sessionId)) {
        return res.status(400).json({ error: 'Missing or invalid values' });
    }

    try {
        const character = await prisma.character.findUnique({
            where: { name }
        });

        if (!character) {
            return res.status(404).json({ success: false, message: 'Character not found' });
        }

        const withinX = relX >= character.relativex && relX <= character.relativex + character.width + .000002;
        const withinY = relY >= character.relativey && relY <= character.relativey + character.height + .000002;

        if (withinX && withinY) {
            const alreadyFound = await prisma.characterProgress.findFirst({
                where: {
                    characterId: character.id,
                    sessionId
                }
            });

            if (!alreadyFound) {
                await prisma.characterProgress.create({
                    data: {
                        characterId: character.id,
                        sessionId
                    }
                });
            }

            const foundCount = await prisma.characterProgress.count({
                where: { sessionId }
            });

            const totalCharacters = await prisma.character.count();

            if (foundCount === totalCharacters) {
                await prisma.gameSession.update({
                    where: { id: sessionId },
                    data: { completedAt: new Date() }
                });

                return res.status(200).json({
                    success: true,
                    message: 'Correct! You found the last character. Game complete!',
                    completed: true
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Correct! You found them.',
                completed: false
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'Wrong spot. Try again!',
                completed: false
            });
        }
    } catch (error) {
        console.error('Error checking click:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}


async function getProgress(req, res) {
    const { sessionId } = req.query;

    if (!sessionId) {
        return res.status(400).json({ error: 'Missing session ID' });
    }

    try {
        const progress = await prisma.characterProgress.findMany({
            where: { sessionId: parseInt(sessionId) },
            include: { character: true }
        });

        const foundCharacters = progress.map(p => p.character.name);


        return res.status(200).json({
            success: true,
            found: foundCharacters
        });
    } catch (error) {
        console.error("Error fetching progress:", error);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    startGame,
    checkClick,
    getProgress
};
