import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => {
    console.log("✅ Connected to the database");

    // Check if the 'users' and 'tasks' tables exist
    const checkTablesQuery = `
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users'
      ) AS users_exists,
      EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'tasks'
      ) AS tasks_exists;
    `;

    client.query(checkTablesQuery)
      .then((res) => {
        const { users_exists, tasks_exists } = res.rows[0];

        // If the users table does not exist, create it
        if (!users_exists) {
          const createUsersTableQuery = `
            CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              email VARCHAR(255) NOT NULL UNIQUE,
              name VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL,
              modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `;

          client.query(createUsersTableQuery)
            .then(() => {
              console.log('Table "users" created successfully!');
            })
            .catch((err) => {
              console.error('Error creating "users" table:', err);
            });
        } else {
          console.log('Table "users" already exists.');
        }

        // If the tasks table does not exist, create it
        if (!tasks_exists) {
          const createTasksTableQuery = `
            CREATE TABLE tasks (
              id SERIAL PRIMARY KEY,
              title TEXT,
              description TEXT,
              is_done BOOLEAN DEFAULT false,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `;

          client.query(createTasksTableQuery)
            .then(() => {
              console.log('Table "tasks" created successfully!');
            })
            .catch((err) => {
              console.error('Error creating "tasks" table:', err);
            });
        } else {
          console.log('Table "tasks" already exists.');
        }
      })
      .catch((err) => {
        console.error('Error checking tables existence:', err);
      });
  })
  .catch((err) => {
    console.error("Database connection error", err.stack);
  });

export default client;