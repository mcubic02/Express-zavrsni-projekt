import axios from "axios";
import { useContext, useState, useEffect } from "react";
import CheckedContext from "../context/CheckedContext";

function Donirano() {

    const {checked, handleChange} = useContext(CheckedContext);
    const [donirano, postaviDonirano] = useState([])

    useEffect(()=> {
        const dohvacanje = async() => 
            {
                const dohvacanjeDonacija = await axios.get("/donirano");
                try{
                    const data = dohvacanjeDonacija.data;
                    postaviDonirano(data);
                }
                catch(error) 
                {
                    console.log(error);
                }
            }
            dohvacanje();
    }, [])
    

    async function Izbrisi(donirano) {

        await axios.delete(`/donirano/${donirano._id}`);
        const rezultat = await axios.get("/donirano");
        postaviDonirano(rezultat.data);
    }
    
    function obradiPodatke(objekt) {
        return {
                tip: objekt.tip,
                vrijednost: objekt.vrijednost,
                opis: objekt.opis
        };
    }
    async function Ponovi(donirano) {
        const zaSlanje = obradiPodatke(donirano);
        await axios.post(`/trazim`, zaSlanje);
        await axios.delete(`/donirano/${donirano._id}`);
        
        const rezultat = await axios.get(`/donirano`);
        postaviDonirano(rezultat.data);
        
        window.location.reload();
        postaviPodatke({
            tip : "",
            vrijednost: "",
            opis: ""
        }
        )
        setShowForm(false);
    }

    if(donirano[0])
    return(
        <>
        {donirano.map((donirano) => (
        <tr key={donirano._id}>
            <td>{donirano.tip}</td>
            <td>{donirano.vrijednost}</td>
            <td>{donirano.opis}</td>
            <td className="lastColumn">
            {checked ? 
                <> 
                <button id="ponoviButton" onClick={() => Ponovi(donirano)}>Ponovi</button>
                <button id="izbrisiButton" onClick={() => Izbrisi(donirano)}>Izbriši</button>
                </>
                :
                ""
            }
            </td>
        </tr>
        ))}
        </>
    )
    else return(<span>Trenutno nema postojećih donacija</span>)
}

export default Donirano
