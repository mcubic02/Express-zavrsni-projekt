import axios from "axios";
import { useContext, useEffect, useState } from "react";
import CheckedContext from "../context/CheckedContext";


function Trazim() {

    const {checked, handleChange} = useContext(CheckedContext);
    const [trazim, postaviTrazim] = useState([])

    useEffect(()=> {
        const dohvacanje = async() => 
            {
                const dohvacanjeDonacija = await axios.get("/trazim");
                try{
                    const data = dohvacanjeDonacija.data;
                    postaviTrazim(data);
                }
                catch(error) 
                {
                    console.log(error);
                }
            }
            dohvacanje();
    }, [])

    async function Donirano(trazim) {

        const zaSlanje = obradiPodatke(trazim)
        await axios.post(`/donirano`, zaSlanje);
        await axios.delete(`/trazim/${trazim._id}`);
        const rezultat = await axios.get("/trazim");
        postaviTrazim(rezultat.data);
        window.location.reload();
        
    }

    async function Izbrisi(trazim) {
        await axios.delete(`/trazim/${trazim._id}`);
        const rezultat = await axios.get("/trazim");
        postaviTrazim(rezultat.data);
    }

    function obradiPodatke(objekt) {
        return {
                tip: objekt.tip,
                vrijednost: objekt.vrijednost,
                opis: objekt.opis
        };
    }

    if(trazim[0])
    return(
        <>
        {trazim.map((trazim) =>(
        <tr key={trazim._id} >
            <td>{trazim.tip}</td>
            <td>{trazim.vrijednost}</td>
            <td>{trazim.opis}</td>
            <td className="lastColumn">
            {checked ? 
                <> 
                <button id="doniranoButton" onClick={() =>Donirano(trazim) }>Donirano</button>
                <button id="izbrisiButton" onClick={() => Izbrisi(trazim)}>Izbriši</button>
                </>
                :
                <button id="donirajButton" onClick={()=>Donirano(trazim)}>Doniraj</button>
            }
            </td>
        </tr>
    ))}
    </>
    )
    else return(<tr>Trenutno se ništa ne traži</tr>)
}

export default Trazim
