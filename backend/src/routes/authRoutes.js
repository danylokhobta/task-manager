import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { refreshAccessTokenController, verifyPasswordController } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token using a refresh token stored in cookies.
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The refresh token used to generate a new access token.
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Unauthorized - Invalid refresh token
 */
router.post("/refresh-token", refreshAccessTokenController);

/**
 * @swagger
 * /auth/verify-password:
 *   post:
 *     summary: Verify user password
 *     description: Checks if the provided password is correct.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Password is valid
 *       401:
 *         description: Unauthorized - Incorrect password or missing token
 */
router.post("/verify-password", authenticateUser, verifyPasswordController);

export default router;