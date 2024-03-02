import { Router } from "express";
import { deleteUser, listUser } from "../../controllers/userController";

/**
 * @swagger
 * tags:
 *   name: User Controller
 *   description: User management APIs
 * components:
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              email:
 *                  type: string
 *                  example: johnsmith@gmail.com
 *              username:
 *                  type: string
 *                  example: johnsmith
 *              fullname:
 *                  type: string
 *                  example: John Smith
 *              created_at:
 *                  type: string
 *                  format: date-time
 *              updated_at:
 *                  type: string
 *                  format: date-time
 */

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get the list of all users, excluding the one making the request
 *     tags: [User Controller]
 *     security:
 *        - bearerToken: []
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
 *                      message:
 *                          type: string
 *                          example: Action completed successfully
 *
 */
router.get("/", listUser);

/**
 * @swagger
 * /api/users/{email}:
 *   delete:
 *     summary: Delete user by email
 *     tags: [User Controller]
 *     security:
 *        - bearerToken: []
 *     parameters:
 *        - in: path
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          example: abc@gmail.com
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
 *                      message:
 *                          type: string
 *                          example: Action completed successfully
 *
 */
router.delete("/:email", deleteUser);

export default router;
