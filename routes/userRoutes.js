import express from 'express';
import * as userController from '../controllers/userController.js';

const routes = express.Router();

routes.post('/register', userController.createUser);

routes.get('/login', userController.getUser);

export default routes;