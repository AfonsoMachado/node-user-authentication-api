import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/forbidden.error";
import JWT from "jsonwebtoken";
import userRespository from "../respositories/user.respository";

function jwtAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    // Veficica o tipo da autenticação se é do tipo bearer
    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido");
    }

    try {
      // Verifica se o token é válido, se for valido retorna o payload do token
      const tokenPayload = JWT.verify(token, "my_secret_key");

      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError("Token inválido");
      }

      const uuid = tokenPayload.sub;
      // user que está dentro do token
      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      // adicionando o user no corpo da requisição
      req.user = user;

      next();
    } catch (error) {
      throw new ForbiddenError("Token inválido");
    }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
