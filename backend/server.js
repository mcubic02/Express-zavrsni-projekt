import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { notFound, errorHandler, neispravnaPrijava, logMiddleware } from './middleware.js';
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/azil", {
    family: 4
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Greska pri spajanju:', error);
});

db.once('open', function () {
    console.log('Spojeni smo na MongoDB bazu');
})

import adminRouter from './routes/adminRoutes.js'
import donaciranoRouter from './routes/doniranoRoutes.js';
import kontaktFormaRouter from './routes/kontaktFormaRoutes.js'
import kontaktRouter from './routes/kontaktRoutes.js'
import nudimRouter from './routes/nudimRoutes.js'
import obavijestiRouter from './routes/obavijestiRoutes.js'
import prijavaRouter from './routes/prijavaRoutes.js'
import registracijaRouter from './routes/registracijaRoutes.js'
import trazimRouter from './routes/trazimRoutes.js'
import userRouter from './routes/userRoutes.js'
import vrsteDonacijeRouter from './routes/vrsteDonacijeRoutes.js'
import vrsteZivotinjaRouter from './routes/vrsteZivotinjaRoutes.js'
import zasticenaRouter from './routes/zasticenaRoutes.js'
import zivotinjeRouter from './routes/zivotinjeRoutes.js'

app.use(logMiddleware);

app.use("/samo-admin", adminRouter)
app.use("/donirano", donaciranoRouter)
app.use("/kontaktForma", kontaktFormaRouter)
app.use("/kontakt", kontaktRouter)
app.use("/nudim", nudimRouter)
app.use("/obavijesti", obavijestiRouter)
app.use("/prijava", prijavaRouter)
app.use("/registracija", registracijaRouter)
app.use("/trazim", trazimRouter)
app.use("/user", userRouter)
app.use("/vrsteDonacije", vrsteDonacijeRouter)
app.use("/vrsteZivotinja", vrsteZivotinjaRouter)
app.use("/zasticena-ruta", zasticenaRouter)
app.use("/zivotinje", zivotinjeRouter)


app.use(notFound);
app.use(errorHandler);
app.use(neispravnaPrijava);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
