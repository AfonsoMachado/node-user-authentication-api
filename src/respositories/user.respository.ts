import User from "../models/user.mode";
import db from "../db";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT uuid, username
      FROM application_user
    `;

    // Retirando apenas o atributo rows
    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findUserById(uuid: string): Promise<User> {
    // $1 representa o primeiro parâmetro da função (evita SQL Injection)
    const query = `
    SELECT uuid, username
    FROM application_user
    WHERE uuid = $1
    `;

    const values = [uuid];
    const { rows } = await db.query<User>(query, values);
    // user = rows[0]
    const [user] = rows;
    return user;
  }

  async createUser(user: User): Promise<string> {
    const script = `
      INSERT INTO application_user (
        username,
        password
      )
      VALUES($1, crypt($2, 'my_salt'))
      RETURNING uuid
    `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newUser] = rows;
    return newUser.uuid;
  }
}

export default new UserRepository();
