import React from 'react';
import '../styles/Footer.css'; // Importuojame stilius
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Naudingos nuorodos</h5>
            <ul className="list-unstyled">
              <li><a href="#">Apie mus</a></li>
              <li><a href="#">Paslaugos</a></li>
              <li><a href="#">Susisiekite su mumis</a></li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Socialiniai tinklai</h5>
            <ul className="list-unstyled social-icons">
              <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>&copy; 2024 BookByte. Visos teisės saugomos.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
