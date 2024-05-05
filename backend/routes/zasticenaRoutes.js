import express from 'express';
import { provjeriToken, provjeriUlogu } from '../authMiddleware.js'; 

const zasticenaRouter = express.Router();


zasticenaRouter.get('/', provjeriToken, async (req, res, next) => {
    try {
        const { korisnickoIme, uloga } = req.korisnik;
        res.json({ korisnickoIme, uloga });
    } catch (error) {
        next(error)
    }
});

export default zasticenaRouter;