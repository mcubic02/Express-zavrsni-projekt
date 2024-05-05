import mongoose from 'mongoose';

const vrstaShema = new mongoose.Schema({
    naziv: {
        type: String,
        required: true,
        unique: true
    }
});

export default vrstaShema;