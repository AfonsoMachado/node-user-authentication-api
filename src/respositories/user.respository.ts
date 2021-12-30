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
}

export default new UserRepository();
