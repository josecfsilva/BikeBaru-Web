import React from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import { Row } from "react-bootstrap";

const SERVER_URL = 'https://bikebaru-server.herokuapp.com';

export default class Circuit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            circuits: [],
            newCircuitData: {
                initial_location: '',
                final_location: '',
                time: '',
                distance: 0,
                velocity: 0,
                calories: 0
            },
            editCircuitData: {
                id: '',
                initial_location: '',
                final_location: '',
                time: '',
                distance: 0,
                velocity: 0,
                calories: 0
            },
            newCircuitModal: false,
            editCircuitModal: false
        }
        this.toggleNewCircuitModal = this.toggleNewCircuitModal.bind(this);
        this.toggleEditCircuitModal = this.toggleEditCircuitModal.bind(this);
    };

    componentDidMount() {
        this.loadCircuits();
    }

    toggleNewCircuitModal() {
        this.setState({
            newCircuitModal: !this.state.newCircuitModal
        });
    }

    toggleEditCircuitModal() {
        this.setState({
            editCircuitModal: !this.state.editCircuitModal
        });
    }

    /* Add Circuit */
    addCircuit = () => {
        let { newCircuitData } = this.state;

        fetch(SERVER_URL + '/circuits/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                initial_location: newCircuitData.initial_location,
                final_location: newCircuitData.final_location,
                time: newCircuitData.time,
                distance: newCircuitData.distance,
                velocity: newCircuitData.velocity,
                calories: newCircuitData.calories,
                partner_id: 1
            })
        })
            .then(this.loadCircuits)
            .catch(err => console.error(err));
    }

    /* Edit Circuit */
    updateCircuit = () => {
        let { editCircuitData } = this.state;

        fetch(SERVER_URL + '/circuits/edit/' + editCircuitData.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                circuit_id: editCircuitData.id,
                initial_location: editCircuitData.initial_location,
                final_location: editCircuitData.final_location,
                time: editCircuitData.time,
                distance: editCircuitData.distance,
                velocity: editCircuitData.velocity,
                calories: editCircuitData.calories,
                partner_id: 1
            })
        })
            .then(this.loadCircuits)
            .catch(err => console.error(err));
    }

    editCircuit(id, initial_location, final_location, time, distance, velocity, calories) {
        this.setState({
            editCircuitData: { id, initial_location, final_location, time, distance, velocity, calories }, editCircuitModal: !this.state.editCircuitModal
        });
    }

    /* Delete Circuit */
    deleteCircuit = (id) => {
        fetch(SERVER_URL + '/circuits/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(this.loadCircuits)
            .catch(err => console.error(err));
    }

    /* Get Circuits */
    loadCircuits = () => {
        fetch(SERVER_URL + '/circuits/')
            .then(response => response.json())
            .then(response => this.setState({
                circuits: response.data,
                newCircuitModal: false, newCircuitData: {
                    initial_location: '',
                    final_location: '',
                    time: '',
                    distance: 0,
                    velocity: 0,
                    calories: 0
                },
                editCircuitModal: false, editCircuitData: {
                    id: '',
                    initial_location: '',
                    final_location: '',
                    time: '',
                    distance: 0,
                    velocity: 0,
                    calories: 0
                }
            }))
            .catch(err => console.log(err))
    }

    renderCircuit = ({ circuit_id, initial_location, final_location, time, distance, velocity, calories }) =>
        <tr key={circuit_id}>
            <td>{initial_location}</td>
            <td>{final_location}</td>
            <td>{time}</td>
            <td>{distance}</td>
            <td>{velocity}</td>
            <td>{calories}</td>
            <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editCircuit.bind(this, circuit_id, initial_location, final_location, time, distance, velocity, calories)}>Editar</Button>
                <Button color="danger" size="sm" onClick={this.deleteCircuit.bind(this, circuit_id)}>Apagar</Button>
            </td>
        </tr>

    render() {
        const { circuits, newCircuitData, editCircuitData } = this.state;

        return (
            <div className="containerTable">
                <h1 style={{ textAlign: "center" }}>Circuitos</h1>

                <Row className="justify-content-center">
                    <Button variant="dark" onClick={this.toggleNewCircuitModal}>Adicionar</Button>
                </Row>

                <Row>
                    <Modal isOpen={this.state.newCircuitModal} toggle={this.toggleNewCircuitModal}>
                        <ModalHeader toggle={this.toggleNewCircuitModal}>Adicionar um novo circuito</ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="initial_location">Localização Inicial</Label>
                                <Input id="initial_location" placeholder="Insira a localização inicial"
                                    value={newCircuitData.initial_location}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, initial_location: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="final_location">Localização Final</Label>
                                <Input id="final_location" placeholder="Insira a localização final"
                                    value={newCircuitData.final_location}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, final_location: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="time">Duração</Label>
                                <Input id="time" type="time" placeholder="Insira a duração"
                                    value={newCircuitData.time}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, time: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="distance">Distância</Label>
                                <Input id="distance" type="number"
                                    value={newCircuitData.distance}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, distance: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="velocity">Velocidade</Label>
                                <Input id="velocity" type="number"
                                    value={newCircuitData.velocity}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, velocity: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="calories">Calorias</Label>
                                <Input id="calories" type="number"
                                    value={newCircuitData.calories}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, calories: e.target.value } })} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.addCircuit}>Adicionar Circuito</Button>
                            <Button color="secondary" onClick={this.toggleNewCircuitModal}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </Row>

                <Row>
                    <Modal isOpen={this.state.editCircuitModal} toggle={this.toggleEditCircuitModal}>
                        <ModalHeader toggle={this.toggleEditCircuitModal}>Editar um circuito</ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="initial_location">Localização Inicial</Label>
                                <Input id="initial_location" placeholder="Insira a localização inicial"
                                    value={editCircuitData.initial_location}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, initial_location: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="final_location">Localização Final</Label>
                                <Input id="final_location" placeholder="Insira a localização final"
                                    value={editCircuitData.final_location}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, final_location: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="time">Duração</Label>
                                <Input id="time" type="time" placeholder="Insira a duração"
                                    value={editCircuitData.time}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, time: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="distance">Distância</Label>
                                <Input id="distance" type="number"
                                    value={editCircuitData.distance}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, distance: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="velocity">Velocidade</Label>
                                <Input id="velocity" type="number"
                                    value={editCircuitData.velocity}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, velocity: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="calories">Calorias</Label>
                                <Input id="calories" type="number"
                                    value={editCircuitData.calories}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, calories: e.target.value } })} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.updateCircuit}>Editar Circuito</Button>
                            <Button color="secondary" onClick={this.toggleEditCircuitModal}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </Row>

                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Localização Inicial</th>
                                <th>Localização Final</th>
                                <th>Duração</th>
                                <th>Distância</th>
                                <th>Velocidade</th>
                                <th>Calorias</th>
                            </tr>
                        </thead>

                        <tbody>
                            {circuits.map(this.renderCircuit)}
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    }
}
