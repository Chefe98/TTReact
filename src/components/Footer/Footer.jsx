import "./Footer.css";
import wsp from "../../assets/whatsapp-svgrepo-com.svg";
import fbk from "../../assets/facebook-color-svgrepo-com.svg";
import ig from "../../assets/instagram-2016-logo-svgrepo-com.svg";
import logo from "../../assets/millennium2-falcon-svgrepo-com.svg";

export const Footer = () => {
  return (

    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <div className="logo-container-footer">

            <img src={logo} alt="Millennium Logo" />

            <span>MILLENNIUM</span>

          </div>

          <p>
            Figuras coleccionables premium,
            anime y cultura geek.
          </p>

        </div>

        <div className="footer-social">

          <h4>Contacto:</h4>

          <ul className="social-icons">

            <li>
              <a href="#">
                <img src={wsp} alt="Whatsapp" />
              </a>
            </li>

            <li>
              <a href="#">
                <img src={ig} alt="Instagram" />
              </a>
            </li>

            <li>
              <a href="#">
                <img src={fbk} alt="Facebook" />
              </a>
            </li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Millennium. Desarrollado por EM.
        </p>

      </div>

    </footer>
  );
};