import express from "express";
const vrsteZivotinjaRouter = express.Router()
import vrstaZivotinje from "../sheme/vrstaZivotinjeModel.js";


vrsteZivotinjaRouter.post("/", async (req, res, next) => {
    const nova = new vrstaZivotinje({
        naziv: req.body.naziv
    })
    try {
        await nova.save();
        res.send("Nova vrsta zivotinje je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});

vrsteZivotinjaRouter.get("/", async (req, res, next) => {
    try {
        const vrsteZivotinja = await vrstaZivotinje.find();
        res.json(vrsteZivotinja);
    } catch (error) {
        next(error)
    }
});


export default vrsteZivotinjaRouter
