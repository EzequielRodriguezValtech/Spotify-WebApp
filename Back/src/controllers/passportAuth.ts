import { Request, Response } from 'express';

export function AuthProfile(req: Request, res: Response) {
  res.redirect('/profile');
}