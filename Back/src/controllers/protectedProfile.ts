import { Request, Response } from 'express';
import { Profile } from 'passport-spotify';
import { User } from '@prisma/client';
import ejs from 'ejs';

export async function GetProtectedProfile(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;
    res.render('profile', { user });
  } else {
    res.redirect('/auth/spotify');
  }
}
