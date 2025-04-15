import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { getUserController, getUserByTokenController, createUserController, updateUserController, deleteUserController } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /user/get:
 *   post:
 *     summary: Get user data
 *     description: Retrieves the details of an authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User data returned
 *       404:
 *         description: User not found
 */
router.post("/get", getUserController);

/**
 * @swagger
 * /user/getByToken:
 *   post:
 *     summary: Get user by token.
 *     description: Get user by token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/getByToken", authenticateUser, getUserByTokenController);

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               name:
 *                 type: string
 *                 description: The user's name.
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", createUserController);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update user data
 *     description: Updates the authenticated user's profile.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's new email.
 *               password:
 *                type: object
 *                required:
 *                  - old
 *                  - new
 *                properties:
 *                  old:
 *                    type: string
 *                    description: The user's current password.
 *                  new:
 *                    type: string
 *                    description: The new password to be set.
 *               name:
 *                 type: string
 *                 description: The user's new name.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/", authenticateUser, updateUserController);

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user account
 *     description: Deletes the authenticated user's account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/", authenticateUser, deleteUserController);

export default router;