import express from 'express';
import * as adController from '../controllers/adController.js';
import authMiddleware from '../middleware/auth.js';


const routes = express.Router();

routes.get('/ads', authMiddleware, adController.getAds);

routes.post('/ads', authMiddleware, adController.createAd);

routes.put('/ads/:id', authMiddleware, adController.updateAd);

routes.delete('/ads/:id', authMiddleware, adController.deleteAd);

export default routes;