import express from 'express';
import { provjeriToken, provjeriUlogu } from '../authMiddleware.js'; 

const userRouter = express.Router();

userRouter.get('/', provjeriToken, provjeriUlogu('user'), (req, res) => {
    res.send('Korisnik je prijavljen kao user');
});

export default userRouter;