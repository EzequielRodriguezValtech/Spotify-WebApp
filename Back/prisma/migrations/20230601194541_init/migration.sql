-- CreateTable
CREATE TABLE "FavouriteSongs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavouriteSongs_pkey" PRIMARY KEY ("id")
);
