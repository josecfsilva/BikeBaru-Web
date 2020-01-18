import React from "react";
import { Container, Card, Row } from "react-bootstrap";

import grupo from '../../images/grupo.jpg';

export default class About extends React.Component {
    render() {
        return (
            <Container>
                <h4 style={{ textAlign: "center" }}>Quem Somos</h4>

                <Row className="justify-content-center">
                    <Card style={{ width: '50%' }}>
                        <Card.Img variant="top" src={grupo} />
                    </Card>
                </Row>

                <Row className="justify-content-center">
                    <Card>
                        <Card.Body>
                            <Card.Text style={{ textAlign: 'center' }}>
                                Secção de cicloturismo do Clube de Futebol "Os Barulhentos". Somos um grupo de amigos com diversas idades, profissões e ocupações, que tem em comum o gosto pelo uso da bicicleta. Realizamos passeios com bicicleta de estrada ou de montanha, equipados com capacete, percorrendo áreas urbanas e/ou rurais, a um ritmo tranquilo e sem preocupações competitivas. O lazer e a criação de laços de amizade constituem as nossas prioridades. Esporadicamente, e com pré-aviso, organizamos passeios mais longos.
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}