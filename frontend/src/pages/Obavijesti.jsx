import { useState, useEffect, useContext } from "react"
import ObavijestForma from "../components/ObavijestForma";
import styles from '../styles/Obavijesti.module.css'
import axios from "axios";
import PopisObavijesti from "../components/PopisObavijesti";
import CheckedContext from "../context/CheckedContext";

function Obavijesti() {

    const { checked, handleChange } = useContext(CheckedContext);
    const [prikazForme, setPrikazForme] = useState(false);
    const [obavijesti, postaviObavijesti] = useState([]);

    const refreshPage = () => {
        window.location.reload();
    };
    useEffect(() => {
        const dohvacanje = async () => {
            const dohvacanjeObavijesti = await axios.get("/obavijesti");
            try {
                const data = dohvacanjeObavijesti.data;
                const sortedData = data.sort((a, b) => new Date(b.datum) - new Date(a.datum));
                postaviObavijesti(sortedData);
            }
            catch (error) {
                console.log(error);
            }
        }
        dohvacanje();


    }, [])
    function prikaziFormu() {
        setPrikazForme(true);
    }

    return (
        <>
            <div className={styles.sveObavijesti}>
                <div className={styles.dodavanjeObavijesti}>
                    {checked ? 
                    <div className={styles.topObavijesti}>
                        {prikazForme ? "" : <button id={styles.novaObavijest} onClick={prikaziFormu}>Nova obavijest</button>}
                    </div>
                    :
                    ""
}                   
                    <div className={styles.bottomObavijesti}>
                        {prikazForme ? <ObavijestForma checked={checked} postaviObavijesti={postaviObavijesti} setPrikazForme={setPrikazForme} refreshPage={refreshPage} /> : ""}
                    </div>
                </div>
                <div className={styles.popisObavijesti}>
                    {obavijesti.map((obavijest) => (
                        <PopisObavijesti obavijest={obavijest} postaviObavijesti={postaviObavijesti} checked={checked} />
                    ))}

                </div>
            </div>
        </>
    )
}


export default Obavijesti