-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "album" TEXT NOT NULL,
<<<<<<< HEAD
    "albumImage" TEXT NOT NULL,
=======
>>>>>>> main

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
