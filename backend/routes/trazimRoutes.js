import express from "express";
const trazimRouter = express.Router()
import Trazim from "../sheme/TrazimModel.js";



trazimRouter.get('/', async (req, res, next) => {
    try {
        const trazim = await Trazim.find();
        res.json(trazim)
    } catch (error) {
        next(error)
    }
})

trazimRouter.post("/", async (req, res, next) => {
    const nova = new Trazim({
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

trazimRouter.delete("/:id", async (req, res, next) => {
    try {
        const trazim = await Trazim.findByIdAndDelete(req.params.id);
        if (!trazim) {
            next(error)
        }
        res.send('Donacija izbrisana');
    } catch (error) {
        next(error)
    }
})

export default trazimRouter