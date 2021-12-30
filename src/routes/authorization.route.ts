import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../errors/forbidden.error";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers["authorization"];

      if (!authorizationHeader) {
        throw new ForbiddenError("Credenciais não informadas");
      }

      const [authenticationType, token] = authorizationHeader.split(" ");

      if (authenticationType !== "Basic" || !token) {
        throw new ForbiddenError("Tipo de autenticação inválido");
      }
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
