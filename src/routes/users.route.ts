import { NextFunction, Request, Response, Router } from "express";

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ username: "afonso" }];
  res.status(200).send(users);
});

usersRoute.get(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(200).send({ uuid });
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
