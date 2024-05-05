import axios from "axios";
import { useContext, useState, useEffect } from "react";
import CheckedContext from "../context/CheckedContext";

function Nudim() {

    const { checked, handleChange } = useContext(CheckedContext);
    const [nudim, postaviNudim] = useState([])

    useEffect(()=> {
        const dohvacanje = async() => 
            {
                const dohvacanjeDonacija = await axios.get("/nudim");
                try{
                    const data = dohvacanjeDonacija.data;
                    postaviNudim(data);
                }
                catch(error) 
                {
                    console.log(error);
                }
            }
            dohvacanje();
    }, [])

    async function Prihvati(nudim) {
        const zaSlanje = obradiPodatke(nudim)
        await axios.post(`/donirano`, zaSlanje);
        await axios.delete(`/nudim/${nudim._id}`);
        const rezultat = await axios.get("/nudim");
        postaviNudim(rezultat.data);
    }

    function obradiPodatke(objekt) {
        return {
            tip: objekt.tip,
            vrijednost: objekt.vrijednost,
            opis: objekt.opis
        };
    }

    if(nudim[0])
        return (
            <>
                {nudim.map((nudim) => (
                    <tr key={nudim._id}>
                        <td>{nudim.tip}</td>
                        <td>{nudim.vrijednost}</td>
                        <td>{nudim.opis}</td>
                        <td className="lastColumn">
                            {checked ?
                                <>
                                    <button id="prihvatiButton" onClick={() => Prihvati(nudim)}>Prihvati</button>
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                ))}
            </>
        )
    else return (<span>Trenutno se nista ne nudi</span>)
}

export default Nudim
