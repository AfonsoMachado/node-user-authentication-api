import { User } from "../models/user.model";

// Definição para extender o express, adicionando user no request

declare module "express-serve-static-core" {
  interface Request {
    user?: User | null;
  }
}
