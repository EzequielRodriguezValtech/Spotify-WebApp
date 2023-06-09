import { Request, Response } from 'express';

export function Welcome(req: Request, res: Response) {
  res.send('Welcome to the server!');
}
