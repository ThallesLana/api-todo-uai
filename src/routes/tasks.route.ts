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
