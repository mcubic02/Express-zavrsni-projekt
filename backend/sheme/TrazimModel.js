import mongoose from "mongoose";
import donacijaShema from './donacijaShema.js'

const Trazim = mongoose.model('Trazim', donacijaShema, "Trazim");

export default Trazim