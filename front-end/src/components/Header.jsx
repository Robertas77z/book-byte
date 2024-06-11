import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/BookByteLogo.png";
import "../styles/Header-styles.css";
import { getLoggedInUser, logout, isUserLoggedIn } from "../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = ({ onShowFavorites, onSearch }) => { 
  const [showModal, setShowModal] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const username = getLoggedInUser();
    console.log("Prisijungęs naudotojas:", username); // Konsolės žinutė
    if (username) {
      setLoggedInUsername(username);
    }
    // Patikriname, ar vartotojas yra adminas
    setIsAdmin(username === "admin"); // Pavyzdys, kaip galite patikrinti, ar vartotojas yra adminas
    // Patikriname, ar vartotojas yra prisijungęs
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload(); // Atnaujina puslapį po atsijungimo
  };

  const handleModalClose = () => {
    console.log("Modalas uždarytas"); // Konsolės žinutė
    setShowModal(false);
  };

  const handleModalOpen = () => {
    console.log("Modalas atidarytas"); // Konsolės žinutė
    setShowModal(true);
  };

  const handleShowFavorites = () => {
    onShowFavorites();
    setFilterActive(!filterActive);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <header className="header-style">
        <a href="">
          <img
            src={logo}
            height="100"
            alt="Logo"
            style={{ borderRadius: "10px" }}
          />
        </a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Ieškoti tarp visu esamu knygų"
            id="header-search"
            value={searchTerm}
            onChange={handleSearch}
          />
           <i class="fas fa-search"></i>
        </form>
        <div>
          <div className="marked-books">
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexSwitchCheckDefault" 
                checked={filterActive} 
                onChange={handleShowFavorites} 
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {filterActive ? "Grįžti į visas knygas" : "Mano įsimintos knygos"}
              </label>
            </div>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            <button className="users-initials" onClick={handleModalOpen}>
              {loggedInUsername
                .split(" ")
                .map((name) => name.slice(0, 2).toUpperCase())}
            </button>
          </>
        ) : (
          <>
            <div>
              <Link to="/register" className="btn btn-primary" id="register-btn">
                Registruotis
              </Link>
              <Link to="/login" className="btn btn-primary" id="login-btn">
                Prisijungti
              </Link>
            </div>
          </>
        )}
      </header>

      <Modal show={showModal} onHide={handleModalClose} className="user-modal">
        <Modal.Header className="user-modal-header">
          <Modal.Title>Naudotojas: {loggedInUsername}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isAdmin && (
            <Link to="/admin" className="btn btn-primary">
              Administratoriaus konsolė
            </Link>
          )}
        </Modal.Body>
        <Modal.Footer className="user-modal-footer">
          <Button
            variant="secondary"
            id="cancel-button"
            onClick={handleModalClose}
          >
            Atšaukti
          </Button>

          <Button variant="danger" id="yes-button" onClick={handleLogout}>
            Atsijungti
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
