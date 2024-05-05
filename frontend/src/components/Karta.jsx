function Karta() {
    
    return (
        <div className="lokacija">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.0454999933245!2d16.540006411841357!3d43.50138636211574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134aa00f17dbf657%3A0x2e72c883229d5bdb!2sUl.%20Domovinskog%20rata%2048%2C%2021312%2C%20Podstrana!5e0!3m2!1shr!2shr!4v1682718556340!5m2!1shr!2shr" 
            width="400" 
            height="350" 
            style={{ border: "0" }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            >

            </iframe>
        </div>
    )
}

export default Karta