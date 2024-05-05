import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CheckedContext from "../context/CheckedContext";
import styles from "../styles/DonacijeForma.module.css"

function DonacijeForma({ setShowForm }) {

    const { checked, handleChange } = useContext(CheckedContext);
    const [warning, setWarning] = useState("");
    const [tipoviDonacija, postaviTipoveDonacija] = useState([]);
    const [formaPodaci, postaviPodatke] = useState({
        tip: "",
        vrijednost: "",
        opis: ""
    });

    function obradiPodatke(objekt) {
        return {
            tip: objekt.tip,
            vrijednost: objekt.vrijednost,
            opis: objekt.opis
        };
    }

    function handleNumberChange(event) {
        event.preventDefault();
        promjenaUlaza(event);
        const godine = event.target.value
        if (godine >= 0) {
            setWarning('');
        } else {

            setWarning('Vrijednost ne može biti negativan broj');
        }
    }



    const saljiDonaciju = async () => {
        const zaSlanje = obradiPodatke(formaPodaci);
        if (checked) {
            await axios.post(`/trazim`, zaSlanje);
        }
        else {
            await axios.post(`/nudim`, zaSlanje);
        }

        postaviPodatke({
            tip: "",
            vrijednost: "",
            opis: ""
        }
        )
        setShowForm(false);
    }

    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeTipova = await axios.get("/vrsteDonacije");
            try {
                postaviTipoveDonacija(dohvacanjeTipova.data);

            } catch (error) {
                console.log(error);
            }

        };

        dohvacanje();
    }, []);


    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    return (
        <div className={styles.donacijaForma}>
            <p className={styles.donacijaNaslov}>Nova donacija:</p>

            <form onSubmit={saljiDonaciju}>
                <div className={styles.tipDonacije}>
                    <p>
                        <label className={styles.vrstaNaslov}>
                            Vrsta:
                            <br></br>
                            <select
                                className={styles.selectDonacije}
                                name="tip"
                                value={formaPodaci.tipDonacije}
                                onChange={promjenaUlaza}
                                required
                            >
                                <option value="">Odaberi vrstu</option>
                                {tipoviDonacija.map((tipDonacije) => (
                                    <option key={tipDonacije._id} value={tipDonacije.naziv}>
                                        {tipDonacije.naziv}
                                    </option>
                                )
                                )
                                }
                            </select>
                        </label>
                    </p>
                </div>
                <p className={styles.iznosDonacije}>
                    <label>
                        Vrijednost:
                        <br></br>
                        <input
                            className={styles.vrijednostDonacije}
                            type="number"
                            name="vrijednost"
                            value={formaPodaci.vrijednost}
                            onChange={handleNumberChange}
                            required
                        />

                    </label>
                </p>
                {warning && <p className='warning1'>{warning}</p>}
                <p className={styles.opisDonacije}>
                    <label>
                        Opis:
                        <br></br>
                        <textarea id={styles.messageInput3} placeholder="Type your message here" name='opis' value={formaPodaci.opis} onChange={promjenaUlaza}></textarea>

                    </label>
                </p>
                <button type='submit' id={styles.objaviButton} >Objavi</button>
            </form>

        </div>
    )
}

export default DonacijeForma