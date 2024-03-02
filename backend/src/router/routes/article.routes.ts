import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  favouriteArticle,
  listArticle,
  unfavouriteArticle,
  updateArticle,
} from "../../controllers/articleController";

/**
 * @swagger
 * tags:
 *   name: Article Controller
 *   description: Article management APIs
 * components:
 *   schemas:
 *      Article:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              title:
 *                  type: string
 *                  example: Article 123
 *              body:
 *                  type: string
 *                  example: This is an article
 *              favourite_count:
 *                  type: number
 *                  example: 9
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
 * /api/articles:
 *   get:
 *     summary: Get the list of all articles
 *     tags: [Article Controller]
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
router.get("/", listArticle);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     tags: [Article Controller]
 *     security:
 *        - bearerToken: []
 *     summary: Create a new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                  example: Article 123
 *                body:
 *                  type: string
 *                  example: This is an article
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
router.post("/", createArticle);

/**
 * @swagger
 * /api/articles/{article_id}:
 *   put:
 *     tags: [Article Controller]
 *     security:
 *        - bearerToken: []
 *     summary: Update an article
 *     parameters:
 *        - in: path
 *          name: article_id
 *          schema:
 *            type: number
 *          required: true
 *          example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                  example: Article 123
 *                body:
 *                  type: string
 *                  example: This is an article
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
router.put("/:article_id", updateArticle);

/**
 * @swagger
 * /api/articles/{article_id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Article Controller]
 *     security:
 *        - bearerToken: []
 *     parameters:
 *        - in: path
 *          name: article_id
 *          schema:
 *            type: number
 *          required: true
 *          example: 123
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
router.delete("/:article_id", deleteArticle);

/**
 * @swagger
 * /api/articles/{article_id}/favorite:
 *   post:
 *     summary: Favorite an article
 *     tags: [Article Controller]
 *     security:
 *        - bearerToken: []
 *     parameters:
 *        - in: path
 *          name: article_id
 *          schema:
 *            type: number
 *          required: true
 *          example: 123
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
router.post("/:article_id/favourite", favouriteArticle);

/**
 * @swagger
 * /api/articles/{article_id}/favorite:
 *   delete:
 *     summary: Unfavorite an article
 *     tags: [Article Controller]
 *     security:
 *        - bearerToken: []
 *     parameters:
 *        - in: path
 *          name: article_id
 *          schema:
 *            type: number
 *          required: true
 *          example: 123
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
router.delete("/:article_id/favourite", unfavouriteArticle);

export default router;
