import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Kontakt.module.css'
import axios from 'axios'
import CheckedContext from '../context/CheckedContext';

function Kontakt() {

    const {checked, handleChange} = useContext(CheckedContext);
    const [kontakt, postaviKontakt] = useState([]);
    const [uredivanje, postaviUredivanje] = useState(false);

    function Uredi(){
        postaviUredivanje(true);
    }
    useEffect(() => {
        const dohvacanje = async () => {
            try {
                const response = await axios.get("/kontakt");
                const kontaktData = response.data[0]; //zato sto imam samo jedan objekt
                postaviKontakt(kontaktData);
            } catch (error) {
                console.log(error);
            }
        };
    
        dohvacanje();
    }, []);

    async function MijenjajKontakt(){
        const zaSlanje = obradiPodatke(kontakt);
        await axios.put(`/kontakt`,zaSlanje);
        const res = await axios.get(`/kontakt`);
        postaviKontakt(res.data);
        postaviUredivanje(false);
    }

    function obradiPodatke(objekt) {
        return {
                ime: objekt.ime,
                adresa: objekt.adresa,
                broj: objekt.broj,
                email: objekt.email
        };
    }

    function PromjenaUlaza (event)   {
       const {name, value} = event.target;
       postaviKontakt({...kontakt,[name]:value});
    }

    if(checked)
    {
        if(uredivanje)
        return(
            <div className={styles.kontaktBox}>
                <form onSubmit={MijenjajKontakt}>
                <input
                    type='text'
                    name='ime'
                    value={kontakt.ime}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='text'
                    name='adresa'
                    value={kontakt.adresa}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='text'
                    name='broj'
                    value={kontakt.broj}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                <input
                    type='email'
                    name='email'
                    value={kontakt.email}
                    onChange={PromjenaUlaza}
                    required
                ></input>
                <br></br>
                 <button id={styles.spremiKontakt}  type='submit'>Spremi</button>
                </form>
                </div>
        )
        else
        return(
            <div className={styles.kontaktBox}>
                <p className={styles.kontaktIme}>{kontakt.ime}</p>
                <p>{kontakt.adresa}</p>
                <p>{kontakt.broj}</p>
                <p>{kontakt.email}</p>
                <button id={styles.urediKontakt} onClick={Uredi}>Uredi</button>
            </div>
        )
    }
    else
    return(
        <div className={styles.kontaktBox}>
                <p className={styles.kontaktIme}>{kontakt.ime}</p>
                <p>{kontakt.adresa}</p>
                <p>{kontakt.broj}</p>
                <p>{kontakt.email}</p>
                </div>
    )
}

export default Kontakt