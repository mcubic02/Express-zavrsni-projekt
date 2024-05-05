import Kontakt from "../components/Kontakt"
import Karta from "../components/Karta"
import KontaktForma from "../components/KontaktForma"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import styles from '../styles/OpciPodaci.module.css'
import OdgovoriForme from "../components/OdgovoriForme"
import CheckedContext from "../context/CheckedContext"

function OpciPodaci() {

    const { checked, handleChange } = useContext(CheckedContext);
    const [poruke, postaviPoruke] = useState([]);

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjePoruka = await axios.get("/kontaktForma");
            try {
                const data = dohvacanjePoruka.data;
                const sortedData = data.sort((a, b) => new Date(b.datum) - new Date(a.datum));
                postaviPoruke(sortedData);
                console.log(sortedData)
            }
            catch (error) {
                console.log(error);
            }
        }
        dohvacanje();
    }, [])

    return (
        <div className={styles.opciPodaci}>
            <div className={styles.leftPodaci}>
                <Kontakt checked={checked} />
                <Karta />
            </div>
            <div className={styles.rightPodaci}>
                {checked && poruke.length > 0 ? <p className={styles.odgovori}>Odgovori na formu:</p> : ""}
                {checked ? (
                    poruke.length > 0 ? (
                        poruke.map((poruka) => (
                            <div className={styles.okvirOdgovora} key={poruka._id}>
                                <OdgovoriForme poruka={poruka} />
                            </div>
                        ))
                    ) : (
                        <p id={styles.nemaOdgovora}>Nema odgovora!</p>
                    )
                ) : (
                    <KontaktForma postaviPoruke={postaviPoruke} refreshPage={refreshPage} />
                )}
            </div>
        </div>
    )
}


export default OpciPodaci