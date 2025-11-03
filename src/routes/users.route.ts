import { UsersController } from '@/controllers/users.controller.js';
import { isAdmin, isAuthenticated } from '@/middlewares/auth.middleware.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { updateUserSchema, userIdSchema } from '@/schemas/users.schema.js';
import { Router } from 'express';

const router = Router();
const usersController = new UsersController();

router.get('/hello-new-user', isAuthenticated, (req, res) => {
  res.status(200).json({
    message: 'Hello new user',
    user: req.user,
  });
});

router.get('/', isAdmin, usersController.getAll.bind(usersController));
router.get(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  usersController.getOne.bind(usersController),
);
router.patch(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  validate(updateUserSchema, 'body'),
  usersController.update.bind(usersController),
);
router.delete(
  '/:id',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  usersController.delete.bind(usersController),
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do usuário
 *           example: 507f1f77bcf86cd799439013
 *         googleId:
 *           type: string
 *           description: ID do Google do usuário
 *           example: 1234567890
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: usuario@example.com
 *         name:
 *           type: string
 *           description: Nome do usuário
 *           example: João da Silva
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Função do usuário no sistema
 *           example: user
 *         picture:
 *           type: string
 *           description: URL da foto de perfil do usuário
 *           example: https://example.com/photo.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Data do último login do usuário
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Nome do usuário
 *           example: João da Silva Atualizado
 */

/**
 * @swagger
 * /api/users/hello-new-user:
 *   get:
 *     summary: Mensagem de boas-vindas para novo usuário
 *     description: Retorna uma mensagem de boas-vindas e os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello new user
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários (Admin)
 *     description: Busca todos os usuários do sistema. Requer permissão de administrador
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão (requer admin)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     description: Busca os dados de um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 *   patch:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: 507f1f77bcf86cd799439013
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Deleta um usuário
 *     description: Remove um usuário do sistema
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
