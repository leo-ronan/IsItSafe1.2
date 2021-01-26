import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Footer() {
    return (
      <footer className="e-card-footer">
        <Container fluid={true}>
          <div className="d-flex justify-content-center p-4 mt-5">
          &copy; 2021 This React App Front-end was made by Elisha Badio
          </div>
        </Container>
      </footer>
    );
  }

export default Footer;