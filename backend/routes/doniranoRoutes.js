import express from "express";
const doniranoRouter = express.Router()
import Donirano from "../sheme/DoniranoModel.js";



doniranoRouter.get('/', async (req, res, next) => {
    try {
        const donacija = await Donirano.find();
        res.json(donacija)
    } catch (error) {
        next(error);
    }
})

doniranoRouter.post("/", async (req, res, next) => {
    const nova = new Donirano({
        tip: req.body.tip,
        vrijednost: req.body.vrijednost,
        opis: req.body.opis
    })
    try {
        await nova.save();
        res.send("Nova donacija je spremljena u bazu");
    } catch (error) {
        next(error);
    }
});

doniranoRouter.delete("/:id", async (req, res, next) => {
    try {
        const donirano = await Donirano.findByIdAndDelete(req.params.id);
        if (!donirano) {
            next(error);
        }
        res.send('Donacija izbrisana');
    } catch (error) {
        next(error);
    }
})

export default doniranoRouter