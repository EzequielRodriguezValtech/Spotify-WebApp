import { Request, Response } from 'express';
import { Profile } from 'passport-spotify';
import { User } from '@prisma/client';


export async function GetProtectedProfile(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;
    res.send(
      `Welcome, ${user.spotifyId}!<br>Access Token: ${user.accessToken}<br>Refresh Token: ${user.refreshToken}`
    );
  } else {
    res.redirect('/auth/spotify');
  }
}