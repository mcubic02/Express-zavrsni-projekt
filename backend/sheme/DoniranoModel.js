import mongoose from 'mongoose';
import donacijaShema from './donacijaShema.js'

const Donirano = mongoose.model('Donirano', donacijaShema, "Donirano");

export default Donirano
