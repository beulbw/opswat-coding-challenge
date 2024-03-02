import { Router } from "express";
import { login, register } from "../../controllers/authController";

/**
 * @swagger
 * tags:
 *   name: Authentication Controller
 *   description: User authentication APIs
 */

const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Authentication Controller]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                  example: johnsmith@gmail.com
 *                username:
 *                  type: string
 *                  example: johnsmith
 *                fullname:
 *                  type: string
 *                  example: John Smith
 *                password:
 *                  type: string
 *                  example: Password@123
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                          example: 201
 *                      message:
 *                          type: string
 *                          example: Registration completed successfully
 */
router.post("/users", register);

/**
 * @swagger
 * tags:
 *   name: Authentication Controller
 *   description: User authentication APIs
 * /api/login:
 *   post:
 *     tags: [Authentication Controller]
 *     summary: Log in using email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                  example: johnsmith@gmail.com
 *                password:
 *                  type: string
 *                  example: Password@123
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                          example: 200
 *                      result:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: johnsmith@gmail.com
 *                              username:
 *                                  type: string
 *                                  example: johnsmith
 *                              fullname:
 *                                  type: string
 *                                  example: John Smith
 *                              token:
 *                                  type: string
 *                                  description: The bearer token for authentication
 *                                  example: eyJhbGciOiJIInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jI6MTcwOTMzNjI5Nn0.UqETQjTVRM56hIlnG8v0--5uEgQZKR0V48Nw
 *                      message:
 *                          type: string
 *                          example: Logged in successfully
 */
router.post("/login", login);

export default router;
