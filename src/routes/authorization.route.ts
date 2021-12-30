import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../errors/forbidden.error";
import userRespository from "../respositories/user.respository";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  async (req: Request, res: Response, next: NextFunction) => {
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

      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = "my_secret_key";
      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
