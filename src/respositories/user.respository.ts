import User from "../models/user.mode";
import db from "../db";
import DatabaseError from "../errors/database.error";

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
    try {
      // $1 representa o primeiro parâmetro da função (evita SQL Injection)
      const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
      `;

      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      // equivalente a user = rows[0]
      const [user] = rows;
      return user;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por ID", error);
    }
  }

  async createUser(user: User): Promise<string> {
    try {
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
    } catch (error) {
      throw new DatabaseError("Erro ao inserir usuário", error);
    }
  }

  async updateUser(user: User): Promise<void> {
    try {
      const script = `
      UPDATE application_user
      SET
        username = $1,
        password = crypt($2, 'my_salt')
      WHERE uuid = $3
    `;

      const values = [user.username, user.password, user.uuid];

      await db.query(script, values);
    } catch (error) {
      throw new DatabaseError("Erro ao atualizar usuário", error);
    }
  }

  async removeUser(uuid: string): Promise<void> {
    try {
      const script = `
        DELETE
        FROM application_user
        WHERE uuid = $1
      `;

      const values = [uuid];
      await db.query(script, values);
    } catch (error) {
      throw new DatabaseError("Erro ao deletar usuário", error);
    }
  }
}

export default new UserRepository();
