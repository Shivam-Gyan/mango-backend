import express from 'express';
import authController from '../controllers/auth.controller.js';
import jwtAuthMiddleware from '../middleware/jwt-auth.middleware.js';

const authRoutes = express.Router();

authRoutes
    .post('/login', authController.login)
    .post('/signup', authController.register)
    .get('/get-profile', jwtAuthMiddleware, authController.getProfile)
    .post('/tasks', jwtAuthMiddleware, authController.createTask)
    .put('/tasks/:taskId', jwtAuthMiddleware, authController.updateTask)
    .delete('/tasks/:taskId', jwtAuthMiddleware, authController.deleteTask);

export default authRoutes;
