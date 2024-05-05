
import Donirano from "./Donirano"
import Nudim from "./Nudim"
import Trazim from "./Trazim"
import styles from '../styles/PopisDonacija.module.css'
import { useContext } from "react"
import CheckedContext from "../context/CheckedContext"

function PopisDonacija() {

    const {checked, handleChange} = useContext(CheckedContext);

    

    return (
        <div className={styles.popisDonacija}>

            
            <table className={styles.tablicaTrazim}>
            <p className={styles.naslovTablice}>Tražimo:</p>

                <tr className={styles.firstRow}>
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>
                </tr>
                <Trazim checked={checked} />

            </table>
            
            <table className={styles.tablicaNudim}>
            <p className={styles.naslovTablice}>Nudi se:</p>

                <tr className={styles.firstRow}>
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>

                </tr>
                    <Nudim/>

            </table>
            
            <table className={styles.tablicaDonirano}>
            <p className={styles.naslovTablice}>Donirano:</p>

                <tr className={styles.firstRow}>
                    <td>Tip</td>
                    <td>Vrijednost</td>
                    <td>Opis</td>
                </tr>
                    <Donirano />

            </table>

        </div>
    )
}

export default PopisDonacija
