/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import { Container, Row, Card, Image } from "react-bootstrap";

import mapa from '../../images/mapa.png';
import facebook from '../../images/facebook.png';
import twitter from '../../images/twitter.png';
import youtube from '../../images/youtube.png';

export default class Contacts extends React.Component {
    render() {
        return (
            <Container>
                <h1 style={{ textAlign: "center" }}>Bike Baru - Contactos</h1>

                <Row className="justify-content-center">
                    <Card>
                        <Card.Body>
                            <Card.Text style={{ textAlign: 'center' }}>
                                Rua Gago Coutinho nº 19 1ºDto - Baixa da Banheira
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>

                <Row className="justify-content-center">
                    <Card style={{ width: '50%' }}>
                        <a target="_blank" href="https://www.google.com/maps/place/Clube+de+Futebol+%22Os+Barulhentos%22/@38.6524821,-9.0462418,17z/data=!3m1!4b1!4m5!3m4!1s0xd1937c5dc30929f:0x8212f047c6b4fb68!8m2!3d38.6524821!4d-9.0440531">
                            <Card.Img variant="top" src={mapa} alt="Mapa do Local de Encontro" />
                        </a>
                    </Card>
                </Row>

                <Row className="justify-content-center">
                    <a target="_blank" href="https://www.facebook.com/barulhentos/">
                        <Image src={facebook} alt="Logo Facebook" />
                    </a>

                    <a target="_blank" href="https://twitter.com/barulhentos">
                        <Image src={twitter} alt="Logo Twitter" />
                    </a>

                    <a target="_blank" href="https://www.youtube.com/user/barulhentos">
                        <Image src={youtube} alt="Logo Youtube" />
                    </a>
                </Row>
            </Container >
        );
    }
}