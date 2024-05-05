import express from "express";
const zivotinjeRouter = express.Router()
import Zivotinja from "../sheme/zivotinjaShema.js";


zivotinjeRouter.post("/", async (req, res, next) => {
    const nova = new Zivotinja({
        ime: req.body.ime,
        vrsta: req.body.vrsta,
        cip: req.body.cip,
        godine: req.body.godine,
        opis: req.body.opis,
        pregled: req.body.pregled,
        udomljen: req.body.udomljen
    })
    try {
        await nova.save();
        res.send("Nova zivotinja je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});

zivotinjeRouter.get("/", async (req, res, next) => {
    try {
        const zivotinja = await Zivotinja.find();
        res.json(zivotinja);
    } catch (error) {
        next(error)
    }
});

zivotinjeRouter.get("/:id", async (req, res, next) => {
    try {
        const zivotinja = await Zivotinja.findById(req.params.id);
        res.json(zivotinja);
    } catch (error) {
        next(error)
    }
})

zivotinjeRouter.put("/:id", async (req, res, next) => {
    try {
        const zivotinja = await Zivotinja.findByIdAndUpdate(req.params.id, req.body);
        res.json(zivotinja);
    } catch (error) {
        next(error)
    }
})

zivotinjeRouter.patch("/:id", async (req, res, next) => {
    try {
        const zivotinja = await Zivotinja.findByIdAndUpdate(req.params.id, req.body);
        res.json(zivotinja);
    } catch (error) {
        next(error)
    }
})



export default zivotinjeRouter