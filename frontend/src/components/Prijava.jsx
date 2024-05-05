import styles from "../styles/Prijava.module.css"
import { useState } from "react";
import axios from "axios";
function Prijava() {


  const [korisnikNePostoji, postaviKorisnikNePostoji] = useState(false)
  const [formaPodaci, postaviPodatke] = useState({
    email: "",
    lozinka: ""
  });

  function obradiPodatke(objekt) {
    return {
      email: objekt.email,
      lozinka: objekt.lozinka
    };
  }

  const promjenaUlaza = (event) => {
    const { name, value } = event.target;

    postaviPodatke({ ...formaPodaci, [name]: value });
  };

  const saljiPodatke = async (event) => {

    event.preventDefault();
    const zaSlanje = obradiPodatke(formaPodaci);
    await axios.post("/prijava", zaSlanje)
    .then(response => {
      localStorage.setItem("token", response.data.token);
      
    })
    .catch(error => {
      postaviKorisnikNePostoji(true)
      console.error("Greška kod prijave:", error);
    });

    postaviPodatke(
      {
        email: "",
        lozinka: ""
      })
  };

  return (
    <div id={styles.prijavaBox}>
      <div id={styles.naslovPrijava}>Prijava korisnika:</div>
      <form 
      id={styles.formaPrijave} 
      onSubmit={saljiPodatke}
      >
        <div id={styles.lijevo}>
          <label htmlFor="email">Email:</label>
          <input 
          name="email"
          type="email" 
          id="email" 
          className={styles.userInput}
          value={formaPodaci.email}
          onChange={promjenaUlaza}
          />
          <label htmlFor="password">Lozinka:</label>
          <input 
          name="lozinka"
          type="password" 
          id="password" 
          className={styles.userInput}
          value={formaPodaci.lozinka}
          onChange={promjenaUlaza}
          />
        </div>
        <div id={styles.desno}>
        
          <input type="submit" value="Prijava" id={styles.prijavaButton} />
        </div>
      </form>
      {korisnikNePostoji ? <p id={styles.korisnikNePostoji}>Korisnik ne postoji!</p> : ""}
    </div>
  )
}

export default Prijava