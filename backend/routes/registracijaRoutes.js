import express from "express";
const registracijaRouter = express.Router()
import Korisnik from "../sheme/korisnikShema.js";
import bcrypt from 'bcrypt'



registracijaRouter.get("/", async (req, res) => {
    try {
        const korisnici = await Korisnik.find();
        res.json(korisnici);
    } catch (error) {
        next(error)
    }
});

const saltRunde = 10;

registracijaRouter.post("/", async (req, res, next) => {

    try {
        const hashLozinka = await bcrypt.hash(req.body.lozinka, saltRunde);
        const noviKorisnik = new Korisnik({ ...req.body, lozinka: hashLozinka });
        await noviKorisnik.save();
        res.send("Novi korisnik je spremljen u bazu");
    } catch (error) {
        next(error)
    }
});

export default registracijaRouter