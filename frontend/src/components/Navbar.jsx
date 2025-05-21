import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModel";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import ForgotPassword from "../pages/user/Forgotpassword";
import { useAuth } from "../components/AuthContext";

const NavigationBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const { isLoggedIn, logout } = useAuth();

  const handleShowModal = (content = "login") => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">ITBlog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            {!isLoggedIn ? (
              <Button className="login-button ms-2" onClick={() => handleShowModal("login")}>
                Login
              </Button>
            ) : (
              <Button className="btn-danger ms-2" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal show={showModal} handleClose={handleCloseModal} title={
        modalContent === "login" ? "Login" :
        modalContent === "signup" ? "Sign Up" :
        "Forgot Password"
      }>
        {modalContent === "login" && (
          <Login
            openSignup={() => setModalContent("signup")}
            openForgot={() => setModalContent("forgot")}
            onLoginSuccess={handleCloseModal}
          />
        )}
        {modalContent === "signup" && (
          <Signup openLogin={() => setModalContent("login")} />
        )}
        {modalContent === "forgot" && (
          <ForgotPassword openLogin={() => setModalContent("login")} />
        )}
      </AuthModal>
    </>
  );
};

export default NavigationBar;
