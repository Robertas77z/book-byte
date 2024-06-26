import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/BookByteLogo.png";
import "../styles/Header-styles.css";
import { getLoggedInUser, logout, isUserLoggedIn } from "../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomHeader = () => { 
  const [showModal, setShowModal] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = getLoggedInUser();
    console.log("Prisijungęs naudotojas:", username);
    if (username) {
      setLoggedInUsername(username);
    }
    setIsAdmin(username === "admin");
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      <header className="header-style">
        <a href="http://localhost:3000/main">
          <img
            src={logo}
            height="100"
            alt="Logo"
            style={{ borderRadius: "10px" }}
          />
        </a>
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

export default CustomHeader;
