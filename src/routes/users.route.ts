import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRespository from "../respositories/user.respository";

const usersRoute = Router();

usersRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRespository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRespository.findUserById(uuid);
    res.status(StatusCodes.OK).send(user);
  }
);

usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRespository.createUser(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

usersRoute.put(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
  }
);

usersRoute.delete(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;

/**
 * GET /users
 * GET /users/:uuid
 * POST /users
 * PUT /users/:uuid
 * DELETE /users/:uuid
 */
