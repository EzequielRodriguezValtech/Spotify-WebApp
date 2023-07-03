import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: 'No se ha proporcionado un token de acceso válido' });
  }
}

export function getUserFromRequest(req: Request): User | undefined {
  return req.user as User;
}