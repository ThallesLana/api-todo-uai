import { TasklistController } from '@/controllers/tasklists.controller.js';
import { isAuthenticated } from '@/middlewares/auth.middleware.js';
import { validate } from '@/middlewares/validate.middleware.js';
import {
  createTasklistSchema,
  tasklistIdSchema,
  updateTasklistSchema,
  userIdSchema,
} from '@/schemas/tasklists.schema.js';
import { Router } from 'express';

const route = Router();
const tasklistController = new TasklistController();

route.get(
  '/:userId',
  isAuthenticated,
  validate(userIdSchema, 'params'),
  tasklistController.getAll.bind(tasklistController),
);

route.post(
  '/',
  isAuthenticated,
  validate(createTasklistSchema, 'body'),
  tasklistController.create.bind(tasklistController),
);

route.patch(
  '/:id',
  isAuthenticated,
  validate(tasklistIdSchema, 'params'),
  validate(updateTasklistSchema, 'body'),
  tasklistController.update.bind(tasklistController),
);

route.delete(
  '/:id',
  isAuthenticated,
  validate(tasklistIdSchema, 'params'),
  tasklistController.delete.bind(tasklistController),
);

export default route;

/**
 * @swagger
 * components:
 *   schemas:
 *     Tasklist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da lista de tarefas
 *           example: 507f1f77bcf86cd799439012
 *         name:
 *           type: string
 *           description: Nome da lista de tarefas
 *           example: Compras do mês
 *         description:
 *           type: string
 *           description: Descrição da lista de tarefas
 *           example: Lista de compras para o mês de novembro
 *         color:
 *           type: string
 *           enum: ['#87CEEB', '#98FF98', '#f54b4bff', '#FFFACD', '#FFDAB9', '#001F3F', '#228B22', '#800020', '#2F4F4F', '#8E4585']
 *           description: Cor da lista de tarefas
 *           example: '#87CEEB'
 *         userId:
 *           type: string
 *           description: ID do usuário proprietário da lista
 *           example: 507f1f77bcf86cd799439013
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da lista
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da lista
 *     CreateTasklist:
 *       type: object
 *       required:
 *         - name
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Nome da lista de tarefas
 *           example: Compras do mês
 *         description:
 *           type: string
 *           minLength: 3
 *           description: Descrição da lista de tarefas
 *           example: Lista de compras para o mês de novembro
 *         color:
 *           type: string
 *           enum: ['#87CEEB', '#98FF98', '#f54b4bff', '#FFFACD', '#FFDAB9', '#001F3F', '#228B22', '#800020', '#2F4F4F', '#8E4585']
 *           description: Cor da lista de tarefas
 *           example: '#87CEEB'
 *         userId:
 *           type: string
 *           description: ID do usuário proprietário da lista
 *           example: 507f1f77bcf86cd799439013
 *     UpdateTasklist:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Nome da lista de tarefas
 *           example: Compras do mês - Atualizado
 *         description:
 *           type: string
 *           minLength: 3
 *           description: Descrição da lista de tarefas
 *           example: Lista de compras para o mês de novembro - Atualizada
 *         color:
 *           type: string
 *           enum: ['#87CEEB', '#98FF98', '#f54b4bff', '#FFFACD', '#FFDAB9', '#001F3F', '#228B22', '#800020', '#2F4F4F', '#8E4585']
 *           description: Cor da lista de tarefas
 *           example: '#98FF98'
 */

/**
 * @swagger
 * /api/tasklist/{userId}:
 *   get:
 *     summary: Retorna todas as listas de tarefas de um usuário
 *     description: Busca todas as listas de tarefas pertencentes a um usuário específico
 *     tags: [Tasklists]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Listas de tarefas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tasklist'
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /api/tasklist:
 *   post:
 *     summary: Cria uma nova lista de tarefas
 *     description: Cria uma nova lista de tarefas para um usuário
 *     tags: [Tasklists]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTasklist'
 *     responses:
 *       201:
 *         description: Lista de tarefas criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasklist'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/tasklist/{id}:
 *   patch:
 *     summary: Atualiza uma lista de tarefas
 *     description: Atualiza os dados de uma lista de tarefas existente
 *     tags: [Tasklists]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *         example: 507f1f77bcf86cd799439012
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTasklist'
 *     responses:
 *       200:
 *         description: Lista de tarefas atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasklist'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Lista de tarefas não encontrada
 *   delete:
 *     summary: Deleta uma lista de tarefas
 *     description: Remove uma lista de tarefas do sistema
 *     tags: [Tasklists]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *         example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: Lista de tarefas deletada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Lista de tarefas não encontrada
 */
