import { useState, useContext } from 'react'
import styles from '../styles/Unos.module.css'
import axios from 'axios';
import CheckedContext from '../context/CheckedContext';

function Unos() {

    const { checked, handleChange } = useContext(CheckedContext);
    const [selectedOption, setSelectedOption] = useState("pas");
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [warning, setWarning] = useState("");
    const [zivotinje, postaviZivotinje] = useState([]);
    const [showMessage, setShowMessage] = useState(false)
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        vrsta: "pas",
        cip: false,
        godine: "",
        opis: "",
        pregled: "",
        udomljen: false
    });


    const unesiZivotinju = async (event) => {
        event.preventDefault();
        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post(`/zivotinje`, zaSlanje);
        const rezultat = await axios.get(`/zivotinje`);
        postaviZivotinje(rezultat.data);
        postaviPodatke(
            {
                ime: "",
                vrsta: "",
                cip: "",
                godine: "",
                opis: "",
                pregled: "",
                udomljen: false
            }
        )
        setSelectedDate("");
        setSelectedOption("pas")
        setIsChecked(false)
        setShowMessage(true);
        
        setTimeout(() => {
            setShowMessage(false);
            window.location.reload();
          }, 10000);
    }

    function handleCheckboxChange(event) {
        if (isChecked){
            setIsChecked(false);
            formaPodaci.cip = false
        }
        else
        {
            setIsChecked(true);
            formaPodaci.cip = true
        }
    
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        promjenaUlaza(event);
    }

    const handleOptionClick = (event) => {
        setSelectedOption(event.target.value);
        promjenaUlaza(event);
    }

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    }


    function obradiPodatke(objekt) {
        return {
            ime: objekt.ime,
            vrsta: objekt.vrsta,
            cip: objekt.cip,
            godine: objekt.godine,
            opis: objekt.opis,
            pregled: objekt.pregled,
            udomljen: false

        };
    }
    function handleNumberChange(event) {
        promjenaUlaza(event);
        const godine = event.target.value
        if (godine >= 0) {
            setWarning('');
        } else {

            setWarning('Dob ne može biti negativan broj');
        }
    }

    if (!checked)
        return (
            <div className={styles.adminOnly}>
                <p className={styles.lock}>🔐</p>
                <p className={styles.labelAdminOnly}>Morate biti prijavljeni kao administrator za pristup ovoj stranici!</p>
            </div>
        )
    else
        return (
            <div className={styles.adminView}>
                {showMessage ? <p id = {styles.unesenaZivotinja}>Nova životinja je unesena!</p> :
                <div className={styles.unosForma}>
                    <p className={styles.unosNaslov}>Unos nove životinje</p>
                    <form onSubmit={unesiZivotinju}>
                        <div className={styles.flexForma}>
                            <div className={styles.left}>
                                <div className={styles.divIme}>
                                    <label>
                                        Ime:
                                        <br></br>
                                        <input
                                            className={styles.ime}
                                            type="ime"
                                            name="ime"
                                            value={formaPodaci.ime}
                                            onChange={promjenaUlaza}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label >
                                        Dob:
                                        <br></br>
                                        <input
                                            className={styles.dobLabel}
                                            type="number"
                                            name="godine"
                                            value={formaPodaci.godine}
                                            onChange={handleNumberChange}
                                            required
                                        />
                                        {warning && <p className='warning'>{warning}</p>}


                                    </label>
                                </div>
                                <div className={styles.messageBox1}>
                                    <label>
                                        Opis:
                                        <br></br>
                                        <textarea id={styles.messageInput1} placeholder="Upisite opis" name='opis' value={formaPodaci.opis} onChange={promjenaUlaza}></textarea>
                                    </label>

                                </div>

                            </div>
                            <div className={styles.right}>
                                <div className={styles.pregledDiv}>
                                    <label className={styles.pregledLabel}>
                                        Datum zadnjeg pregleda:
                                        <br></br>
                                        <input
                                            id={styles.pregled}
                                            type="date"
                                            name="pregled"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            required
                                        />

                                    </label>
                                </div>
                                <div>
                                    <label className='checkboxLabel'>
                                        <input
                                            id={styles.checkbox}
                                            type="checkbox"
                                            name="cip"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}

                                        />
                                        Čipiran
                                    </label>
                                </div>
                                <div className={styles.options}>
                                    <p className={styles.optionVrsta}>Vrsta:</p>
                                    <br></br>
                                    <label>

                                        <input
                                            className={styles.radio}
                                            type="radio"
                                            value="pas"
                                            name='vrsta'
                                            checked={selectedOption === 'pas'}
                                            onChange={handleOptionClick}
                                        />
                                        Pas
                                    </label>
                                    <br></br>
                                    <label>

                                        <input
                                            className={styles.radio}
                                            type="radio"
                                            value="mačka"
                                            name='vrsta'
                                            checked={selectedOption === 'mačka'}
                                            onChange={handleOptionClick}
                                        />
                                        Mačka
                                    </label>
                                    <br></br>
                                    <label className={styles.radioLabel}>

                                        <input
                                            className={styles.radio}
                                            type="radio"
                                            value="ostalo"
                                            name='vrsta'
                                            checked={selectedOption === 'ostalo'}
                                            onChange={handleOptionClick}
                                        />
                                        Ostalo
                                    </label>
                                </div>

                            </div>
                        </div>


                        <button id={styles.submitButton} type="submit" >Unesi životinju</button>

                    </form>
                </div>}
            </div>
        )

}


export default Unos