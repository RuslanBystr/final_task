import authMiddleware from "../../middleware/auth.js";
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';


const app = express();
app.use(authMiddleware);

app.get('/test', (req, res) => {
    res.status(200).json({message: 'Success'})
})

describe('JWT Auth middleware', () => {
    it('should return 401 if token is\'nt provided', async () => {
        const response = await request(app).get('/test');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized: no token provided')
    });

    it('should return 401 if invalid token', async () => {
        const response = await request(app)
        .get('/test')
        .set('authorization', 'Bearer invalidtoken');

        expect(response.status).toBe(401);
        expect(response.body.error_message).toBe("Unauthorized");
    });

    it('should call next and decoded token to req if token is valid', async () => {
        const validToken = jwt.sign({userId: 1}, process.env.JWT_SECRET);
        const response = await request(app)
        .get('/test')
        .set('authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
    });
})