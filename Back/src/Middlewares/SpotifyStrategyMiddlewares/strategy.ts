import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const handleUserAuthentication = async (
  accesToken: string,
  refreshToken: string,
  expires_in: number,
  profile: any,
  done: (error: any, user?: any) => void
) => {
  try {
    const user = await findUserBySpotifyId(profile.id);
    const primaryEmail = getPrimaryEmail(profile);

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expires_in);

    if (user) {
      await updateAccessTokenAndExpiration(user.id, accesToken, expirationDate);
      done(null, user);
    } else {
      const newUser = await createUser(
        profile,
        primaryEmail,
        accesToken,
        refreshToken,
        expirationDate
      );

      done(null, { user: newUser });
    }
  } catch (error) {
    done(error);
  }
};

export const findUserBySpotifyId = async (spotifyId: string) => {
  return await prisma.user.findUnique({
    where: { spotifyId },
  });
};

export const getPrimaryEmail = (profile: any) => {
  return profile.emails && profile.emails.length > 0
    ? profile.emails[0].value
    : "";
};

export const updateAccessTokenAndExpiration = async (
  userId: number,
  accessToken: string,
  expirationDate: Date
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      accessToken,
      expiresAt: expirationDate,
    },
  });
};

export const createUser = async (
  profile: any,
  email: string,
  accessToken: string,
  refreshToken: string,
  expirationDate: any
) => {
  return await prisma.user.create({
    data: {
      spotifyId: profile.id,
      name: profile.displayName,
      email,
      expiresAt: expirationDate,
      accessToken,
      refreshToken,
    },
  });
};
