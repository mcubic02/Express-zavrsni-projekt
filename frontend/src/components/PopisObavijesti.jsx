import styles from '../styles/PopisObavijesti.module.css'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import CheckedContext from '../context/CheckedContext';

function PopisObavijesti({ obavijest, postaviObavijesti }) {

    const { checked, handleChange } = useContext(CheckedContext);
    const [godina, postaviGodinu] = useState("");
    const [dan, postaviDan] = useState("");
    const [mjesec, postaviMjesec] = useState("");
    async function Delete() {
        await axios.delete(`/obavijesti/${obavijest._id}`);

        const rezultat = await axios.get("/obavijesti");
        postaviObavijesti(rezultat.data);

    }

    useEffect(() => {

        const date = new Date(obavijest.datum);
        postaviDan(date.getDate());
        postaviMjesec(date.getMonth() + 1);
        postaviGodinu(date.getFullYear());

    }, [])



    return (
        <div className={styles.obavijestBox}>
            <div className={styles.naslovLabel} style={{ backgroundColor: obavijest.vazno ? 'rgba(138, 93, 63, 0.495)' : 'var(--backgroundColor)' }}>
                <p className={styles.naslovObavijesti}>{obavijest.naslov}</p>
                <div className={styles.datumIDelete}>
                    <p className={styles.datumObavijesti}>{dan}.{mjesec}.{godina}</p>
                    {checked ?
                        <button id={styles.trashButton} onClick={Delete}>
                            <FaTrash />
                        </button>
                        :
                        ""
                    }
                </div>


            </div>
            <div className={styles.sadrzajObavijesti}>
                <p>{obavijest.tekst}</p>
            </div>
        </div>

    )
}

export default PopisObavijesti