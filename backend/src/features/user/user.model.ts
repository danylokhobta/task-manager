import { Injectable } from '@nestjs/common';
import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import { CustomError } from '@/utils';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

@Injectable()
export class UserModel {
  async getUserByEmail(email: string) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return result.rows.length ? result.rows[0] : null;
    } catch {
      throw new CustomError("Database error: Unable to fetch user by email", 500);
    }
  }

  async getUserById(userId: number) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
      return result.rows.length ? result.rows[0] : null;
    } catch {
      throw new CustomError("Database error: Unable to fetch user by ID", 500);
    }
  }

  async createUser(email: string, password: string, name: string) {
    try {
      const result = await pool.query(`
        INSERT INTO users (email, password, name)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [email, password, name]
      );
      return result.rows[0];
    } catch {
      throw new CustomError("Database error: Unable to create user", 500);
    }
  }

  async updateUser(userId: number, email: string, password: string, name: string) {
    try {
      const result = await pool.query(`
        UPDATE users
        SET email = $1, password = $2, name = $3, modified_at = NOW()
        WHERE id = $4
        RETURNING *`,
        [email, password, name, userId]
      );
      if (!result.rows.length) {
        throw new CustomError("Database error: User not found", 404);
      }
      return result.rows[0];
    } catch {
      throw new CustomError("Database error: Unable to update user data", 500);
    }
  }

  async deleteUser(userId: number) {
    try {
      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
      if (!result.rows.length) {
        throw new CustomError("Database error: User not found", 404);
      }
      return result.rows[0];
    } catch {
      throw new CustomError("Database error: Unable to delete user", 500);
    }
  }
}
