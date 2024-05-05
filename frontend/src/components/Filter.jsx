import { useState } from 'react';
import styles from '../styles/Filter.module.css'
function Filter({selectedOption1, setSelectedOption1, selectedOption2, setSelectedOption2}) {
    const handleFilterClick1 = (event) => {
        setSelectedOption1(event.target.value);
    }
    const handleFilterClick2 = (event) => {
        setSelectedOption2(event.target.value);
    }
    return(
       
        
        <div className={styles.filterBox}>
            <p className={styles.filterLabel}>FILTERI</p>
            <div className={styles.top}>
            <p className={styles.vrsteLabel}>Vrste:</p>
            <label>
                <input
                    type="radio"
                    value="svi"
                    checked={selectedOption1 === 'svi'}
                    onChange={handleFilterClick1}
                />
                Svi
            </label>
            <br></br>
            <label>
                
                <input
                    type="radio"
                    value="pas"
                    checked={selectedOption1 === 'pas'}
                    onChange={handleFilterClick1}
                />
                Pas
            </label>
            <br></br>
            <label>
                <input
                    type="radio"
                    value="mačka"
                    checked={selectedOption1 === 'mačka'}
                    onChange={handleFilterClick1}
                />
                Mačka
            </label>
            

            </div>
            <div className={styles.bottom}>
            <p className={styles.statusLabel}>Status:</p>
            <label>
                <input
                    type="radio"
                    value="sviUdomljeni"
                    checked={selectedOption2 === 'sviUdomljeni'}
                    onChange={handleFilterClick2}
                />
                Svi
            </label>
            <br></br>
            <label>
                
                <input
                    type="radio"
                    value="true"
                    checked={selectedOption2 === "true"}
                    onChange={handleFilterClick2}
                />
                Udomljen
            </label>
            <br></br>
            <label>
                <input
                    type="radio"
                    value="false"
                    checked={selectedOption2 === "false"}
                    onChange={handleFilterClick2}
                />
                Nije udomljen
            </label>
            

            </div>
        </div>
    )
}

export default Filter;