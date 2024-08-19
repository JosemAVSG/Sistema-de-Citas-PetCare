import styles from "../styles/hero.module.scss";
import { Link } from "react-router-dom";
import hero from '../assets/veterinarian-check-ing-puppy-s-health.jpg';
const Hero = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.hero_text}>
            <div className={styles.hero_title}>
              <h1>Bienvenido a Petcare</h1>
            </div>

            <div className={styles.hero_paragraph}>
              <p>¡No te quedes sin turno! ¡Reserva ahora y cuida de la salud de tu mascota! Con Petcare podrás programar turnos de manera online y así asegurarte de que tu mascota reciba atención de la mejor calidad.</p>
            </div>
            <div className={styles.hero_button}>
              <Link to="/login" className="btn-hero">
                !Reseva ahora y dale a tu mascota la mejor salud
              </Link>
            </div>
          </div>
          <div className={styles.hero_image}>
            <img src={hero} alt="hero" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;
