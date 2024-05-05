import styles from "../styles/Registracija.module.css"
import { useState } from "react";
import axios from "axios";

function Registracija() {

  const [izabranaOpcija, postaviIzabranuOpciju] = useState("user")
  const [korisnikPostoji, postaviKorisnikPostoji] = useState(false)
  const [pokaziPoruku, postaviPokaziPoruku] = useState(false)
  const [formaPodaci, postaviPodatke] = useState({
    korisnickoIme: "",
    email: "",
    lozinka: ""
  });

  function obradiPodatke(objekt) {
    return {

      korisnickoIme: objekt.korisnickoIme,
      email: objekt.email,
      lozinka: objekt.lozinka,
      uloga: objekt.uloga

    };
  }

  const promjenaUlaza = (event) => {
    const { name, value } = event.target;

    postaviPodatke({ ...formaPodaci, [name]: value });
  };

  const saljiPodatke = async (event) => {
    event.preventDefault();
    formaPodaci.uloga = izabranaOpcija;
    const zaSlanje = obradiPodatke(formaPodaci);
    try {
        await axios.post("/registracija", zaSlanje);
        const rezultat = await axios.get("/registracija");
        postaviPodatke({
            korisnickoIme: "",
            email: "",
            lozinka: "",
            uloga: ""
        });
        postaviKorisnikPostoji(false);
        postaviPokaziPoruku(true)
        setTimeout(() => {
          postaviPokaziPoruku(false);
        }, 10000);

    } catch (error) {
      postaviKorisnikPostoji(true)
        console.error("Greška prilikom slanja ili dohvaćanja podataka:", error);
    }
};


  const handleClick = (event) => {
    postaviIzabranuOpciju(event.target.value)
  }
  return (
    <div id={styles.registracijaBox}>
      {pokaziPoruku ?
      <p id={styles.uspjesnaRegistracija}>Uspješna registracija</p> 
      :
      <>
      <div id={styles.naslovRegistracija}>Registracija korisnika:</div>
      <form
        id={styles.formaRegistracije}
        onSubmit={saljiPodatke}
      >
        <div id={styles.lijevo}>
          <label htmlFor="username">Korisničko ime:</label>
          <input
            name="korisnickoIme"
            type="text"
            id="username"
            className={styles.userInput}
            value={formaPodaci.korisnickoIme}
            onChange={promjenaUlaza}
          />

          <label htmlFor="email">Email:</label>

          <input
            name="email"
            type="email"
            id="registrationEmail"
            className={styles.userInput}
            value={formaPodaci.email}
            onChange={promjenaUlaza}
          />

          <label htmlFor="password">Lozinka:</label>

          <input
            name="lozinka"
            type="password"
            id="registrationPassword"
            className={styles.userInput}
            value={formaPodaci.lozinka}
            onChange={promjenaUlaza}
          />
          

        </div>
        <div id={styles.desno}>
          <div id={styles.odabirUloge}>
            <span>Vrsta:</span>
            <div id={styles.radioButtons}>
              <div>
                <input
                  type="radio"
                  className={styles.radioButton}
                  value="user"
                  checked={izabranaOpcija === 'user'}
                  onChange={handleClick}
                />
                <label htmlFor="user">User</label>
              </div>
              <div>
                <input
                  type="radio"
                  className={styles.radioButton}
                  value="admin"
                  checked={izabranaOpcija === 'admin'}
                  onChange={handleClick}
                />
                <label htmlFor="admin">Admin</label>
              </div>
            </div>
          </div>
          <input type="submit" value="Registracija" id={styles.registracijaButton} />
        </div>
      </form>
      {korisnikPostoji ? <p id={styles.korisnikPostoji}>Korisnik s ovim podacima već postoji!</p> : ""}
      </>}
    </div>
  )
}

export default Registracija