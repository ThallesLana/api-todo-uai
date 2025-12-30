import { TasksController } from '@/controllers/tasks.controller.js';
import { isAuthenticated } from '@/middlewares/auth.middleware.js';
import { validate } from '@/middlewares/validate.middleware.js';
import {
  tasklistIdSchema,
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from '@/schemas/tasks.schema.js';
import { Router } from 'express';

const router = Router();
const tasksController = new TasksController();

router.get(
  '/:tasklistId',
  isAuthenticated,
  validate(tasklistIdSchema, 'params'),
  tasksController.getAll.bind(tasksController),
);

router.post(
  '/',
  isAuthenticated,
  validate(createTaskSchema, 'body'),
  tasksController.create.bind(tasksController),
);

router.patch(
  '/:id',
  isAuthenticated,
  validate(taskIdSchema, 'params'),
  validate(updateTaskSchema, 'body'),
  tasksController.update.bind(tasksController),
);

router.delete(
  '/:id',
  isAuthenticated,
  validate(taskIdSchema, 'params'),
  tasksController.delete.bind(tasksController),
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da tarefa
 *           example: 507f1f77bcf86cd799439011
 *         title:
 *           type: string
 *           description: Título da tarefa
 *           example: Comprar pão de queijo
 *         note:
 *           type: string
 *           description: Notas adicionais da tarefa
 *           example: Comprar no mercado da esquina
 *         done:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *           example: false
 *         tasklistId:
 *           type: string
 *           description: ID da lista de tarefas à qual a tarefa pertence
 *           example: 507f1f77bcf86cd799439012
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da tarefa
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização da tarefa
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - tasklistId
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           description: Título da tarefa
 *           example: Comprar pão de queijo
 *         note:
 *           type: string
 *           minLength: 3
 *           description: Notas adicionais da tarefa
 *           example: Comprar no mercado da esquina
 *         done:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *           example: false
 *         tasklistId:
 *           type: string
 *           description: ID da lista de tarefas
 *           example: 507f1f77bcf86cd799439012
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           description: Título da tarefa
 *           example: Comprar pão de queijo e café
 *         note:
 *           type: string
 *           minLength: 3
 *           description: Notas adicionais da tarefa
 *           example: Comprar no mercado da esquina
 *         done:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *           example: true
 */

/**
 * @swagger
 * /api/tasks/{tasklistId}:
 *   get:
 *     summary: Retorna todas as tarefas de uma lista
 *     description: Busca todas as tarefas pertencentes a uma lista específica
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: tasklistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *         example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Lista de tarefas não encontrada
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa em uma lista específica
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Atualiza uma tarefa
 *     description: Atualiza os dados de uma tarefa existente
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Tarefa não encontrada
 *   delete:
 *     summary: Deleta uma tarefa
 *     description: Remove uma tarefa do sistema
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Tarefa não encontrada
 */
