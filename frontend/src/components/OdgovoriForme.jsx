import '../styles/OdgovoriForme.css'
import { useEffect, useState } from 'react';

function OdgovoriForme ({poruka}){

    const [godina, postaviGodinu]= useState("");
    const [dan, postaviDan]= useState("");
    const [mjesec, postaviMjesec]= useState("");
    const [sat, postaviSat] = useState("");
    const [minute, postaviMinute] = useState("");
    
   

    useEffect(()=>{
        console.log(poruka)
    const date = new Date(poruka.datum);
    postaviDan(date.getDate());
    postaviMjesec(date.getMonth() + 1);
    postaviGodinu(date.getFullYear());
    postaviSat(date.getHours());
    postaviMinute(date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })
    );


    },[])
    return(
    <div className='poruka'>
        <p className='porukaOd'>Poruka od: {poruka.ime} {poruka.prezime}</p>
        <p className='porukaKontakt'>Kontakt: {poruka.email}</p>
        <p className='poslanaPoruka'>{poruka.poruka}</p>
        <p className='datumPoruke'>{dan}.{mjesec}.{godina}. {sat}:{minute}</p>
        
    </div>
    );
}

export default OdgovoriForme