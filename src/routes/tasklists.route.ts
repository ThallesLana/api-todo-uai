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
