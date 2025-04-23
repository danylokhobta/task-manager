import pkg from "pg";
const { Pool } = pkg;
import { CustomError } from "@/utils";

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Fetch all tasks for a user
export const getTasksModel = async (userId: number) => {
  try {
    const query = "SELECT * FROM tasks WHERE user_id = $1";
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new CustomError("Database error: Unable to retrieve tasks.", 500);
  }
};

// Fetch a single task by ID
export const getTaskModel = async (taskId: string) => {
  try {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const result = await pool.query(query, [taskId]);

    if (result.rows[0].length === 0) {
      throw new CustomError("Database error: Task not found.", 404);
    }
    
    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to retrieve task.", 500);
  }
};

// Create a new task
export const createTaskModel = async (data: { userId: number, title: string, description: string}) => {
  const { userId, title, description } = data;
  try {
    const query = `INSERT INTO tasks
      (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const result = await pool.query(query, [userId, title, description]);
    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to create task.", 500);
  }
};

// Update an existing task
export const updateTaskModel = async (data: { userId: number, taskId: string, title: string, description: string, is_done: boolean}) => {
  const { taskId, title, description, is_done } = data;
  try {
    const query = `UPDATE tasks
      SET title = $1, description = $2, is_done = $3, modified_at = NOW()
      WHERE id = $4
      RETURNING *`;
    const result = await pool.query(query, [title, description, is_done, taskId]);
    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to update task.", 500);
  }
};

// Delete a task
export const deleteTaskModel = async (taskId: string) => {
  try {
    const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [taskId]);
    if (!result.rows.length) {
      throw new CustomError(`Database error: Task with ID ${taskId} not found.`, 404);
    }
    return result.rows[0];
  } catch (error) {
    throw new CustomError("Database error: Unable to delete task.", 500);
  }
};