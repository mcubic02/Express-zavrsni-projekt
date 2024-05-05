import { model } from 'mongoose';
import vrstaShema from './vrstaShema.js';

const vrstaDonacije = model('Vrsta', vrstaShema, "vrsteDonacije");

export default vrstaDonacije;
