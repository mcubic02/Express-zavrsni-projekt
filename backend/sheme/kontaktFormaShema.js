import mongoose from 'mongoose';

const kontaktFormaShema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    prezime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    poruka: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        required: true
    }
})

const KontaktForma = mongoose.model('KontaktForma', kontaktFormaShema, "KontaktForma");
export default KontaktForma