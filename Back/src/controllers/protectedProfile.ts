import { Request, Response } from 'express';
import { Profile } from 'passport-spotify';

type SpotifyUser = {
  profile: Profile;
  accessToken: string;
  refreshToken: string;
};

export async function GetProtectedProfile(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as SpotifyUser;
    const { profile, accessToken, refreshToken } = user;
    res.send(
      `Welcome, ${profile.displayName}!<br>Access Token: ${accessToken}<br>Refresh Token: ${refreshToken}`
    );
  } else {
    res.redirect('/auth/spotify');
  }
}