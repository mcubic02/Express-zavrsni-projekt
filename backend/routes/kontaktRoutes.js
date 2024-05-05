import express from 'express';
const kontaktRouter = express.Router();
import Kontakt from '../sheme/kontaktShema.js';



kontaktRouter.get('/', async (req, res, next) => {
    try {
        const kontakt = await Kontakt.find();
        res.json(kontakt)
    } catch (error) {
        next(error)
    }
})

kontaktRouter.post("/", async (req, res, next) => {
    const nova = new Kontakt({
        ime: req.body.ime,
        adresa: req.body.adresa,
        broj: req.body.broj,
        email: req.body.email
    })
    try {
        await nova.save();
        res.send("Novi kontakt podaci su spremljeni u bazu");
    } catch (error) {
        next(error);
    }
});

kontaktRouter.put('/', async (req, res, next) => {
    try {
        const kontakt = await Kontakt.findOneAndUpdate(req.body);
        if (!kontakt) {
            next(error)
        }
        res.json(kontakt);
    } catch (error) {
        next(error)
    }
});

export default kontaktRouter