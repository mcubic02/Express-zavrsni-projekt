import express from "express";
const obavijestiRouter = express.Router()
import Obavijest from "../sheme/obavijestShema.js";


obavijestiRouter.get('/', async (req, res, next) => {
    try {
        const obavijest = await Obavijest.find();
        res.json(obavijest)
    } catch (error) {
        next(error)
    }
})

obavijestiRouter.post("/", async (req, res, next) => {
    const nova = new Obavijest({
        naslov: req.body.naslov,
        tekst: req.body.tekst,
        datum: req.body.datum,
        vazno: req.body.vazno
    })
    try {
        await nova.save();
        res.send("Nova obavijest je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});

obavijestiRouter.delete("/:id", async (req, res, next) => {
    try {
        const obavijest = await Obavijest.findByIdAndDelete(req.params.id);
        if (!obavijest) {
            next(error)
        }
        res.send('Obavijest izbrisana');
    } catch (error) {
        next(error)
    }
})

export default obavijestiRouter