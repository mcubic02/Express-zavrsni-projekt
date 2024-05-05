import { useState, useEffect, useContext } from 'react'
import styles from '../styles/Donacije.module.css'
import axios from 'axios';
import DonacijeForma from '../components/DonacijeForma';
import PopisDonacija from '../components/PopisDonacija';
import CheckedContext from '../context/CheckedContext';

function Donacije() {

    const { checked, handleChange } = useContext(CheckedContext);
    const [showForm, setShowForm] = useState(false);

    function formShow() {
        setShowForm(true);
    }

    return (
        <div className={styles.donacije}>
            <div className={styles.novaDonacija}>
                {showForm ?
                    <DonacijeForma setShowForm={setShowForm} checked={checked} />
                    :
                    <button id={styles.novaDonacijaButton} onClick={formShow}>Nova Donacija</button>
                }
            </div>
            <PopisDonacija />

        </div>

    )
}


export default Donacije