import mongoose from 'mongoose';

const zivotinjaShema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    vrsta: {
        type: String,
        required: true
    },
    cip: {
        type: Boolean,
        required: true
    },
    godine: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
    },
    pregled: {
        type: String,
        required: true
    },
    udomljen: {
        type: Boolean,
        required: true
    }
})

const Zivotinja = mongoose.model('Zivotinja', zivotinjaShema, "Zivotinje");
export default Zivotinja