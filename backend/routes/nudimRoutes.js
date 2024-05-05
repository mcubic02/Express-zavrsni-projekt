import express from "express";
const nudimRouter = express.Router()
import Nudim from "../sheme/NudimModel.js";


nudimRouter.get('/', async (req, res, next) => {
    try {
        const nudim = await Nudim.find();
        res.json(nudim)
    } catch (error) {
        next(error)
    }
})

nudimRouter.post("/", async (req, res, next) => {
    const nova = new Nudim({
        tip: req.body.tip,
        vrijednost: req.body.vrijednost,
        opis: req.body.opis
    })
    try {
        await nova.save();
        res.send("Nova donacija je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});

nudimRouter.delete("/:id", async (req, res, next) => {
    try {
        const nudim = await Nudim.findByIdAndDelete(req.params.id);
        if (!nudim) {
            next(error)
        }
        res.send('Donacija izbrisana');
    } catch (error) {
        next(error)
    }
})

export default nudimRouter