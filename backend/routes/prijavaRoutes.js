import express from "express";
const prijavaRouter = express.Router()
import Korisnik from "../sheme/korisnikShema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



prijavaRouter.post('/', async (req, res, next) => {
    try {
        
        const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
        if (korisnikBaza && await bcrypt.compare(req.body.lozinka, korisnikBaza.lozinka)) {
            const token = jwt.sign(
                { korisnickoIme: korisnikBaza.korisnickoIme, uloga: korisnikBaza.uloga },
                'tajniKljuc',
                { expiresIn: '1h' });
            res.json({ token })
        } else {
            const error = new Error('Neispravna prijava');
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error)
    }
});


export default prijavaRouter