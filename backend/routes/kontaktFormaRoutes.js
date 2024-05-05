import express from "express";
const kontaktFormaRouter = express.Router()
import KontaktForma from "../sheme/kontaktFormaShema.js";



kontaktFormaRouter.get('/', async (req, res, next) => {
    try {
        const kontaktForma = await KontaktForma.find();
        res.json(kontaktForma)
    } catch (error) {
        next(error)
    }
})

kontaktFormaRouter.post("/", async (req, res, next) => {
    const nova = new KontaktForma({
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        poruka: req.body.poruka,
        datum: req.body.datum
    })
    try {
        await nova.save();
        res.send("Nova poruka je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});


export default kontaktFormaRouter