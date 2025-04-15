import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";
import CustomError from '../utils/customError.js';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Get a user by email
export const getUserByEmailModel = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const user = await pool.query(query, [email]);

    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to fetch user by email", 500); // Handle DB errors with 500
  }
};

// Get a user by ID
export const getUserByIdModel = async (userId) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const user = await pool.query(query, [userId]);

    if (user.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to fetch user by ID", 500); // Handle DB errors with 500
  }
};

// Create a new user in the database
export const createUserModel = async (email, password, name) => {
  try {
    const query = `
      INSERT INTO users
      (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [email, password, name];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new CustomError("Database error: Failed to create user", 500); // Return 500 if user creation fails
    }

    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to create user", 500); // Handle DB errors with 500
  }
};

// Update user data
export const updateUserModel = async (userId, email, password, name) => {
  try {
    const query = `
      UPDATE users
      SET email = $1, password = $2, name = $3, modified_at = NOW()
      WHERE id = $4
      RETURNING *`;
    const values = [email, password, name, userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new CustomError("Database error: Unable to update user because it doesn't exist", 404); // Return 404 if the user is not found or update fails
    }

    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to update user data", 500); // Handle DB errors with 500
  }
};

// Delete user account
export const deleteUserModel = async (userId) => {
  try {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new CustomError("Database error: Unable to delete user because it doesn't exist", 404); // Return 404 if the user doesn't exist
    }

    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to delete user account", 500); // Handle DB errors with 500
  }
};