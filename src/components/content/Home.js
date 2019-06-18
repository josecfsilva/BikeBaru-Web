import React from "react";
import { Container, Row, Image } from "react-bootstrap";

import logo from '../../images/logo.png';

export default class Home extends React.Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Image src={logo} roundedCircle />
                </Row>
                
                <Row className="justify-content-center">
                    Vem pedalar connosco!
                </Row>
            </Container>
        );
    }
}