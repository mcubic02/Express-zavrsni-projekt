import express from "express";
const vrstaDonacijeRouter = express.Router()
import vrstaDonacije from "../sheme/vrstaDonacijeModel.js";


vrstaDonacijeRouter.post("/", async (req, res, next) => {
    const nova = new vrstaDonacije({
        naziv: req.body.naziv
    })
    try {
        await nova.save();
        res.send("Nova vrsta je spremljena u bazu");
    } catch (error) {
        next(error)
    }
});

vrstaDonacijeRouter.get("/", async (req, res, next) => {
    try {
        const vrsteDonacije = await vrstaDonacije.find();
        res.json(vrsteDonacije);
    } catch (error) {
        next(error)
    }
});


export default vrstaDonacijeRouter