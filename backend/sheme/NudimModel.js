import mongoose from "mongoose";
import donacijaShema from './donacijaShema.js'

const Nudim= mongoose.model('Nudim', donacijaShema, "Nudim");

export default Nudim