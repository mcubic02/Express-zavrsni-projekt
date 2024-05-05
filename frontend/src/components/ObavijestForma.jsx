import styles from '../styles/ObavijestForma.module.css'
import { useState, useContext } from 'react';
import axios from 'axios';
import CheckedContext from '../context/CheckedContext';

function ObavijestForma({postaviObavijesti, setPrikazForme, refreshPage}) {

    const [isChecked, setIsChecked] = useState(false);
    const {checked, handleChange} = useContext(CheckedContext);
    const [formaPodaci, postaviPodatke] = useState({
        naslov: "",
        tekst: "",
        datum: "",
        vazno: ""
    });
    function obradiPodatke(objekt) {
        return {
                naslov: objekt.naslov,
                tekst: objekt.tekst,
                datum: objekt.datum,
                vazno: objekt.vazno
        };
    }

    function handleCheckboxChange(event) {
        const {checked} = event.target;
        setIsChecked(checked);
        postaviPodatke({ ...formaPodaci, vazno: checked });
    }

    const objaviObavijest = async (event) => {
        event.preventDefault();
        formaPodaci.vazno = isChecked;
        formaPodaci.datum = new Date();

        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post("/obavijesti", zaSlanje);

        const rezultat = await axios.get("/obavijesti");
        postaviObavijesti(rezultat.data);
        postaviPodatke(
            {
            naslov: "",
            tekst: "",
            datum: "",
            vazno: ""
        })
        setPrikazForme(false);
        refreshPage();
    };

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    };

    return (
        <div className={styles.obavijestForma}>
            <p className={styles.kontaktNaslov1}>Unesite novu obavijest:</p>
            <form onSubmit={objaviObavijest}>
                <label>
                    <p className={styles.obavijestiNaslov}>Naslov:</p>
                    <input
                        className={styles.naslovInput}
                        type='text'
                        name='naslov'
                        value={formaPodaci.naslov}
                        onChange={promjenaUlaza}
                        required
                        maxLength={20}
                    >
                    </input>
                </label>
                <div id={styles.messageBox3}>
                    <label>
                        Tekst:
                        <br></br>
                        <textarea id={styles.messageInput2} placeholder="Type your message here" name='tekst' value={formaPodaci.tekst} onChange={promjenaUlaza} minLength={10} maxLength={200}></textarea>
                    </label>
                </div>
                {checked ? 
                <div>
                    <label className={styles.checkboxLabel2}>
                        <input
                            className={styles.checkbox2}
                            type="checkbox"
                            name="vazno"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            value={isChecked}
        
                        />
                        Važno
                    </label>
                </div>
                :
                ""
                }
                
                <button className={styles.submitButton} type='submit'>Objavi</button>
            </form>
        </div>
    )
}

export default ObavijestForma