import { PrismaClient, Song } from "@prisma/client";

const prisma = new PrismaClient();

export function extractSongDataToSave(items: any[], spotifyUserId?: string): Song[] {
  return items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      artist: item.artists[0]?.name || "",
      duration: item.duration_ms || 0,
      album: item.album.name,
      spotifyUserId: spotifyUserId,
    };
  });
}

export function extractSongData(items: Song[]): Song[] {
  return items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      artist: item.artists[0]?.name || "",
      duration: item.duration_ms || 0,
      album: item.album.name,
    };
  });
}

export async function getExistingSongs(songData: Song[]): Promise<Song[]> {
  const songIds = songData.map((song) => song.id);

  const existingSongs = await prisma.song.findMany({
    where: {
      id: { in: songIds },
    },
  });

  return existingSongs;
}

export function filterUniqueSongs(
  songData: Song[],
  existingSongs: Song[]
): Song[] {
  const uniqueSongs = songData.filter((song) => {
    return !existingSongs.find(
      (existingSong) => existingSong.name === song.name
    );
  });

  return uniqueSongs;
}

export async function createUniqueSongs(uniqueSongs: any[]) {
  await prisma.song.createMany({
    data: uniqueSongs,
  });

  return uniqueSongs;
}

export async function getTopSongs(): Promise<Song[]> {
  const topSongs: Song[] = await prisma.song.findMany({
    take: 5,
  });

  return topSongs;
}