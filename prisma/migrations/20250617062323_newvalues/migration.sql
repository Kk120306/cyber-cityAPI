-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterProgress" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "CharacterProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharacterProgress" ADD CONSTRAINT "CharacterProgress_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterProgress" ADD CONSTRAINT "CharacterProgress_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
