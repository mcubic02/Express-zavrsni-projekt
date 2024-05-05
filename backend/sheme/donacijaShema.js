import mongoose from 'mongoose';

const donacijaShema = new mongoose.Schema({
    tip: {
        type: String,
        required: true
    },
    vrijednost: {
        type: String,
        required: true
    },
    opis: {
        type: String,
        required: true
    }

});

export default donacijaShema