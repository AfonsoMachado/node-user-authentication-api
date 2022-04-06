import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../errors/forbidden.error";
import userRespository from "../repositories/user.respository";

async function basicAuthMiddleware(
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

    // Veficica o tipo da autenticação
    if (authenticationType !== "Basic" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido");
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");

    const [username, password] = tokenContent.split(":");

    if (!username || !password) {
      throw new ForbiddenError("Credenciais não preenchidas");
    }

    const user = await userRespository.findUserByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new ForbiddenError("Usuário ou senha inválidos");
    }

    // Inserindo o user dentro da requisição
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default basicAuthMiddleware;
