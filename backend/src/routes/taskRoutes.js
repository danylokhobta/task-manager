import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getTasksController, createTaskController, updateTaskController, deleteTaskController } from "../controllers/taskController.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Fetch all tasks
 *     description: Retrieves all tasks for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks returned
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateUser, getTasksController);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - is_done
 *             properties:
 *               title:
 *                 type: string
 *                 description: The tasks's new title.
 *               description:
 *                 type: string
 *                 description: The tasks's new description.
 *               is_done:
 *                 type: boolean
 *                 description: The tasks's new status.
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateUser, createTaskController);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Modifies an existing task by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - is_done
 *             properties:
 *               title:
 *                 type: string
 *                 description: The tasks's new title.
 *               description:
 *                 type: string
 *                 description: The tasks's new description.
 *               is_done:
 *                 type: boolean
 *                 description: The tasks's new status.
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put("/:taskId", authenticateUser, updateTaskController);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Removes a task by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:taskId", authenticateUser, deleteTaskController);

export default router;