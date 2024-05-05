import mongoose from 'mongoose';

const kontaktShema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    },
    broj: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Kontakt = mongoose.model('Kontakt', kontaktShema, "Kontakt");
export default Kontakt