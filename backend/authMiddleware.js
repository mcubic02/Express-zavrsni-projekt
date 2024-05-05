import jwt from 'jsonwebtoken';

export const provjeriToken = (req, res, next) => {
    const authZaglavlje = req.headers['authorization'];
    if (!authZaglavlje) return res.status(403).send('Ne postoji autorizacijsko zaglavlje');

    const token = authZaglavlje.split(' ')[1];
    if (!token) return res.status(403).send('Bearer token nije pronađen');

    try {
        const dekodiraniToken = jwt.verify(token, 'tajniKljuc');
        req.korisnik = dekodiraniToken;
        next(); 
    } catch (err) {
        return res.status(401).send('Neispravni Token');
    }
};

export const provjeriUlogu = (uloga) => (req, res, next) => {
    if (req.korisnik && req.korisnik.uloga === uloga) {
        next(); 
    } else {
        res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.korisnik.uloga}`);
    }
};