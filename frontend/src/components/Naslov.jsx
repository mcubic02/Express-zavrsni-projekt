import { Routes, Route, Link } from 'react-router-dom'
import Donacije from '../pages/Donacije'
import Obavijesti from '../pages/Obavijesti'
import OpciPodaci from '../pages/OpciPodaci'
import Popis from '../pages/Popis'
import Unos from '../pages/Unos'
import { useState, useContext } from 'react'
import styles from '../styles/Naslov.module.css'
import CheckedContext from '../context/CheckedContext'

function Naslov({ uloga, korisnickoIme }) {
  const { checked, handleChange } = useContext(CheckedContext);


  return (
    <>
      <div className={styles.naslovBox}>
        <div className={styles.naslov}>
          <div className={styles.tekstNaslova}>
            <p>Azil za životinje Šapa</p>
          </div>
          <div className={styles.adminBox}>
            <span>Prijavljeni ste kao {uloga}: {korisnickoIme}</span>
          </div>
        </div>
        <nav>
          <Link to="/" className={styles.navLink} >Opći podaci</Link>
          <Link to="/obavijesti" className={styles.navLink}>Obavijesti</Link>
          <Link to="/donacije" className={styles.navLink} >Donacije</Link>
          <Link to="/popis" className={styles.navLink} >Popis životinja</Link>
          <Link to="/unos" className={styles.navLink}>Unos</Link>
        </nav>
      </div>
      <div className={styles.box}>
        <Routes>
          <Route path="/" element={<OpciPodaci />}></Route>
          <Route path="/donacije" element={<Donacije />}></Route>
          <Route path="/popis" element={<Popis />}></Route>
          <Route path="/unos" element={<Unos />}></Route>
          <Route path="/obavijesti" element={<Obavijesti />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default Naslov