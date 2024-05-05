import mongoose from 'mongoose';

const obavijestShema = new mongoose.Schema({
    naslov: {
        type: String,
        required: true
    },
    tekst: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    vazno: {
        type: Boolean,
        required: true
    }
})

const Obavijest = mongoose.model('Obavijest', obavijestShema, "Obavijest");
export default Obavijest