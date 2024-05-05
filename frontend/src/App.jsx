import './App.css'
import Naslov from './components/Naslov'
import CheckedContext from './context/CheckedContext.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminUser from './components/AdminUser.jsx'


axios.defaults.baseURL = "http://localhost:3000";

function App() {

  const [uloga, postaviUlogu] = useState("")
  const [korisnickoIme, postaviKorisnickoIme] = useState("")
  const [prijavljen, postaviPrijavljen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const dohvatiPodatke = async () => {
      try {
        const response = await axios.get("/zasticena-ruta", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { uloga, korisnickoIme } = response.data;
        postaviKorisnickoIme(korisnickoIme);
        postaviUlogu(uloga);
        if(uloga === "admin") 
          setChecked(true)
        if(uloga === "user")
          setChecked(false)
        postaviPrijavljen(true);
        if(prijavljen === true)
            console.log("Korisnik je prijavljen")
        
      } catch (error) {
        console.error("Greška prilikom dohvatanja podataka:", error);
      }
    };

    dohvatiPodatke();
  }, [])

  return (
    <>
    <CheckedContext.Provider value={{ checked}}>
    {prijavljen ? <Naslov uloga = {uloga} korisnickoIme={korisnickoIme}/> : <AdminUser/> }
    </CheckedContext.Provider>
    </>
  )
}

export default App
