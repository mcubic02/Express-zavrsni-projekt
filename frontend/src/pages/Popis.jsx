import axios from "axios"
import styles from '../styles/Popis.module.css'
import { useState, useEffect, useContext } from "react";
import Zivotinja from "../components/Zivotinja";
import Filter from "../components/Filter";
import CheckedContext from "../context/CheckedContext";

function Popis() {

    const {checked, handleChange} = useContext(CheckedContext);
    const [selectedOption1, setSelectedOption1] = useState("svi");
    const [selectedOption2, setSelectedOption2] = useState("sviUdomljeni");
    const [reRender, setReRender] = useState("");
    const [zivotinje, postaviZivotinje] = useState([]);
    
    useEffect(() => {
        const dohvacanje = async () => {
            try {
                const response = await axios.get("/zivotinje");
                postaviZivotinje(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        dohvacanje();
    }, []);
    return (
        <div className={styles.popisBox}>
        <div className={styles.left}>
           <Filter 
           selectedOption1={selectedOption1} 
           setSelectedOption1={setSelectedOption1} 
           selectedOption2={selectedOption2} 
           setSelectedOption2={setSelectedOption2}
           />
        </div>
        <div className={styles.right}>
            {zivotinje?.map((zivotinja) => (
                <Zivotinja 
                zivotinja={zivotinja} 
                postaviZivotinje = {postaviZivotinje} 
                checkedd={checked}
                selectedOption1={selectedOption1} 
                selectedOption2={selectedOption2} 
                reRender= {reRender}
                setReRender = {setReRender}
                />
            ))}
        </div>
        </div>
    
    )
}


export default Popis