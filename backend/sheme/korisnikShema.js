import mongoose from 'mongoose';

const korisnikShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    lozinka: {
        type: String,
        required: true
    },
    korisnickoIme: {
        type: String,
        required: true
    },
    uloga: {
        type: String,
        default: "user"
    }

});

const Korisnik = mongoose.model('Korisnik', korisnikShema, "korisnici");
export default Korisnik