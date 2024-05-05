import express from 'express';
import { provjeriToken, provjeriUlogu } from '../authMiddleware.js'; 

const adminRouter = express.Router();

adminRouter.get('/', provjeriToken, provjeriUlogu('admin'), (req, res) => {
    res.send('Korisnik je prijavljen kao admin');
});

export default adminRouter;