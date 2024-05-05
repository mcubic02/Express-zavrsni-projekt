import { useEffect, useState, useContext } from 'react'
import styles from '../styles/Zivotinja.module.css'
import axios from 'axios';
import CheckedContext from '../context/CheckedContext';


function Zivotinja({ zivotinja, postaviZivotinje, selectedOption1, selectedOption2 }) {

    const { checked, handleChange } = useContext(CheckedContext);
    const [mijenjamo, postaviMijenjamo] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptionCip, setSelectedOptionCip] = useState(false);
    const [selectedOptionUdomljen, setSelectedOptionUdomljen] = useState(false);
    const [udomljenaZivotinja, setUdomljenaZivotinja] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [podatci, postaviPodatkee] = useState({});


    useEffect(() => {
        promjenaUlaza({ target: { name: 'vrsta', value: selectedOption} });
    }, [selectedOption]);

    useEffect(() => {
        promjenaUlaza({ target: { name: 'cip', value: selectedOptionCip ? "true" : "false" } });
    }, [selectedOptionCip]);

    useEffect(() => {
        promjenaUlaza({ target: { name: 'udomljen', value: selectedOptionUdomljen ? "true" : "false" } });
    }, [selectedOptionUdomljen]);



    const handleDateChange = (event) => {
        event.preventDefault();
        setSelectedDate(event.target.value);
        promjenaUlaza(event);
    }
    const handleOptionClick = (event) => {
        event.preventDefault();
        setSelectedOption(prevState => event.target.value);
        promjenaUlaza(event);
    }
    const handleOptionClick1 = (event) => {
        event.preventDefault();
        setSelectedOptionCip(event.target.value === "true");
    }
    const handleOptionClick2 = (event) => {
        event.preventDefault();
        setSelectedOptionUdomljen(event.target.value === "true");
        
    }
    async function udomiZivotinju() {

        await axios.patch(`/zivotinje/${zivotinja._id}`, { udomljen: true });
        const rezultat = await axios.get("/zivotinje");
        postaviZivotinje(rezultat.data);

    }

    function Uredi() {
        setSelectedOptionCip(zivotinja.cip);
        setSelectedOptionUdomljen(zivotinja.udomljen);
        const dohvacanje = async () => {
            const dohvacanjeZivotinje = axios.get(`/zivotinje/${zivotinja._id}`);
            try {
                postaviPodatkee((await dohvacanjeZivotinje).data);
            } catch (error) {
                console.log(error);
            }
            setSelectedOption((await dohvacanjeZivotinje).data.vrsta);
            setSelectedDate((await dohvacanjeZivotinje).data.pregled);
        };
        dohvacanje();
        postaviMijenjamo(true);
    }
    function obradiPodatke(objekt) {
        return {
            ime: objekt.ime,
            vrsta: objekt.vrsta,
            cip: objekt.cip,
            godine: objekt.godine,
            opis: objekt.opis,
            pregled: objekt.pregled,
            udomljen: objekt.udomljen

        };
    }


    async function Spremi() {

        const zaSlanje = obradiPodatke(podatci);
        await axios.put(`/zivotinje/${zivotinja._id}`, zaSlanje);
        const rezultat = await axios.get(`/zivotinje`);
        postaviPodatkee(rezultat.data);
        postaviMijenjamo(false);

    }

    function promjenaUlaza(event) {
        postaviPodatkee({ ...podatci, [event.target.name]: event.target.value });
    }

    useEffect(() => {

        if (zivotinja.udomljen) {
            setUdomljenaZivotinja(true);
        }
        else
            setUdomljenaZivotinja(false);
    }, [])
    if ((selectedOption1 === "svi" || selectedOption1 === zivotinja.vrsta) &&
        (selectedOption2 === "sviUdomljeni" ||
            (selectedOption2 === "true" && zivotinja.udomljen) ||
            (selectedOption2 === "false" && !zivotinja.udomljen)))

        return (<>
            {mijenjamo ?
                <div className={styles.zivotinjaBox} style={{ backgroundColor: zivotinja.udomljen ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <form onSubmit={Spremi}>
                        <p className='imeGodine'>
                            <input
                                className={styles.ime1}                                
                                type="ime"
                                name="ime"
                                value={podatci.ime || ""}
                                onChange={promjenaUlaza}

                            />
                            ,
                            <input
                                className={styles.dobLabel1}
                                type="number"
                                name="godine"
                                value={podatci.godine || ""}
                                onChange={promjenaUlaza}
                            />
                        </p>
                        <div className={styles.options1}>
                            <p>
                                <label>
                                    Vrsta:
                                    <input
                                        className={styles.radio1}
                                        name='vrsta'
                                        type="radio"
                                        value="pas"
                                        checked={selectedOption === 'pas'}
                                        onChange={handleOptionClick}
                                    />
                                    Pas
                                </label>
                                <label>

                                    <input
                                        className={styles.radio1}
                                        name='vrsta'
                                        type="radio"
                                        value="mačka"
                                        checked={selectedOption === 'mačka'}
                                        onChange={handleOptionClick}
                                    />
                                    Mačka
                                </label>
                                <label className={styles.radioLabel1}>

                                    <input
                                        className={styles.radio1}
                                        name='vrsta'
                                        type="radio"
                                        value="ostalo"
                                        checked={selectedOption === 'ostalo'}
                                        onChange={handleOptionClick}
                                    />
                                    Ostalo
                                </label>

                            </p>
                        </div>
                        {/* <p>
                        <label className='checkboxLabel1'>
                            <input
                                className='checkbox1'
                                type="checkbox"
                                name="cip"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                value={isChecked}
                            />
                            Čipiran
                        </label>
                    </p> */}
                        <div className={styles.options2}>
                            <p>
                                <label>
                                    <input
                                        className={styles.radio1}
                                        name='cip'
                                        type="radio"
                                        value="true"
                                        checked={selectedOptionCip === true}
                                        onChange={handleOptionClick1}
                                    />
                                    Čipiran
                                </label>
                                <label>

                                    <input
                                        className={styles.radio1}
                                        name='cip'
                                        type="radio"
                                        value="false"
                                        checked={selectedOptionCip === false}
                                        onChange={handleOptionClick1}
                                    />
                                    Ne čipiran
                                </label>
                            </p>
                        </div>
                        <div className={styles.messageBoxx}>
                            <p>
                                <label>
                                    Opis:
                                    <input type="text" id={styles.messageInputt} name="opis" placeholder="Upisite opis" value={podatci.opis} onChange={promjenaUlaza}></input>
                                </label>
                            </p>
                        </div>
                        <p>
                            <label className={styles.pregledLabel}>
                                Pregled:
                                <input
                                    id={styles.pregled}
                                    type="date"
                                    name="pregled"
                                    value={selectedDate}
                                    onChange={handleDateChange}

                                />

                            </label>
                        </p>
                        <div className={styles.options3}>
                            <p>
                                <label>
                                    <input
                                        className={styles.radio1}
                                        name='udomljen'
                                        type="radio"
                                        value="true"
                                        checked={selectedOptionUdomljen === true}
                                        onChange={handleOptionClick2}
                                    />
                                    Udomljen
                                </label>
                                <label>

                                    <input
                                        className={styles.radio1}
                                        name='udomljen'
                                        type="radio"
                                        value="false"
                                        checked={selectedOptionUdomljen === false}
                                        onChange={handleOptionClick2}
                                    />
                                    Ne udomljen
                                </label>
                            </p>
                        </div>
                        <button className={styles.zivotinjeButton} >Spremi</button>
                    </form>
                </div>

                :

                <div className={styles.zivotinjaBox} style={{ backgroundColor: zivotinja.udomljen === true ? 'rgba(143, 132, 132, 0.396)' : ' lightgreen' }} >
                    <p className={styles.imeGodine}>{zivotinja.ime}, {zivotinja.godine} </p>
                    <p>Vrsta: {zivotinja.vrsta}</p>
                    <p>{zivotinja.cip === true ? "Čipiran" : "Nije Čipiran"}</p>
                    <p>{zivotinja.opis}</p>
                    <p>Pregled: {zivotinja.pregled}</p>
                    {checked ? "" : zivotinja.udomljen === true ? <p className={styles.udomljen} >UDOMLJEN!</p> : <button id={styles.udomljenButton} onClick={udomiZivotinju}>Udomi</button>}
                    {checked ? <button className={styles.zivotinjeButton} onClick={Uredi}>Uredi</button> : ""}
                </div>
            }
        </>
        )
    else
        return ("");

}

export default Zivotinja