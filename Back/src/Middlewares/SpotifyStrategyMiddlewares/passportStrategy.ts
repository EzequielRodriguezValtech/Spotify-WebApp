import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CALLBACK_URL } from "../../config/config";
import { handleUserAuthentication } from "./strategy";
import { Strategy as SpotifyStrategy } from "passport-spotify";

export const spotifyStrategy =
new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOTIFY_CALLBACK_URL,
      scope: ["user-top-read", "user-read-email", "user-read-private"],
      showDialog: true,
    },
    async (
      accessToken: string,
      refreshToken: string,
      expires_in: number,
      profile: any,
      done: (error: any, user?: any) => void
    ) =>
      handleUserAuthentication(
        accessToken,
        refreshToken,
        expires_in,
        profile,
        done
      )
  );