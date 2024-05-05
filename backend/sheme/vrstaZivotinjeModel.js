import { model } from 'mongoose';
import vrstaShema from './vrstaShema.js';

const vrstaZivotinje = model('VrstaZivotinje', vrstaShema, "vrsteZivotinja");

export default vrstaZivotinje;