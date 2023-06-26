import { Request, Response } from 'express';
import { User } from '@prisma/client';

export async function GetProtectedProfile(req: Request, res: Response) {
  if (req.user) {
    const user = req.user as User;
    res.render('profile', { user });
  } else {
    res.redirect('/auth/spotify');
  }
}
