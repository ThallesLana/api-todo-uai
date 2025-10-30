import { TasklistController } from '@/controllers/tasklistController.js';
import { Router } from 'express';
import { isAuthenticated } from '@/middlewares/auth.middleware.js';

const route = Router();
const tasklistController = new TasklistController();

route.get('/:userId', isAuthenticated, tasklistController.getAll.bind(tasklistController));

route.post('/', isAuthenticated, tasklistController.create.bind(tasklistController));

route.patch('/:id', isAuthenticated, tasklistController.update.bind(tasklistController));

route.delete('/:id', isAuthenticated, tasklistController.delete.bind(tasklistController));

export default route;
