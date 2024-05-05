import { useState, useEffect } from 'react'
import styles from '../styles/KontaktForma.module.css'
import axios from 'axios';


function KontaktForma({postaviPoruke, refreshPage}) {

    const [showMessage, setShowMessage] = useState(false);
    const [formaPodaci, postaviPodatke] = useState({
         ime: "",
         prezime: "",
         email: "",
         poruka: ""
     });
    //  const refreshPage = () => {
    //     window.location.reload();
    //   };
     function obradiPodatke(objekt) {
        return {
            
                ime: objekt.ime,
                prezime: objekt.prezime,
                email: objekt.email,
                poruka: objekt.poruka,
                datum: objekt.datum
            
        };
    }

   
    const saljiPodatke = async (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('messageInput');
        formaPodaci.poruka = messageInput.value;
        messageInput.value='';
        formaPodaci.datum = new Date();
        const zaSlanje = obradiPodatke(formaPodaci);
        await axios.post("/kontaktForma", zaSlanje);

        const rezultat = await axios.get("/kontaktForma");

      
        postaviPoruke(rezultat.data);
        setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      refreshPage();
    }, 10000);

        postaviPodatke(
            {
            ime: "",
            prezime: "",
            email: "",
            poruka: "",
            datum:""
        })
        
    };

    const promjenaUlaza = (event) => {
        const { name, value } = event.target;

        postaviPodatke({ ...formaPodaci, [name]: value });
    };

    // const [poruka, saljiPoruku] = useState(false); 
    // const  [ime, postaviIme] = useState("");
    // const [imee, promjenaImena] = useState(false);
    // const promjenaUlaza = (event) => {
    //     const { ime } = event.target;

    //     postaviPodatke({ ...formaPodaci, [ime]: value });
    // };
    return(
        
            showMessage ? 
            <p className={styles.messageSent}>Poruka je poslana!</p>
            :
            <div className={styles.kontaktForma}>
            <p className={styles.kontaktNaslov}>Kontaktirajte nas!</p>
            <form onSubmit={saljiPodatke}>
                <div className={styles.divIme}>
                    <label>
                        Ime:
                        <br></br>
                        <input
                            className={styles.ime}
                            type="ime"
                            name="ime"
                            value={formaPodaci.ime}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Prezime:
                        <br></br>
                        <input
                            
                            type="prezime"
                            name="prezime"
                            value={formaPodaci.prezime}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <br></br>
                        <input
                            className={styles.email}
                            type="email"
                            name="email"
                            value={formaPodaci.email}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div className={styles.messageBox}>
                    <label>
                        Poruka:
                        <br></br>
                        <textarea id="messageInput" className={styles.messageInput} placeholder="Type your message here"></textarea>
                    </label>
                     
                </div>

                <button id={styles.submitButton1} type="submit" >Pošalji poruku</button>

            </form>

        </div>
            
    )
}

export default KontaktForma