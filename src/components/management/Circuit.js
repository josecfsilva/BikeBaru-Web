import React from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import { Row } from "react-bootstrap";

export default class Circuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circuits: [],
            newCircuitData: {
                name: '',
                initial_location: '',
                final_location: '',
                time: '',
                distance: 0,
                velocity: 0,
                calories: 0,
                partner_id: 0
            },
            editCircuitData: {
                id: '',
                name: '',
                initial_location: '',
                final_location: '',
                time: '',
                distance: 0,
                velocity: 0,
                calories: 0,
                partner_id: 0
            },
            newCircuitModal: false,
            editCircuitModal: false
        }
        this.toggleNewCircuitModal = this.toggleNewCircuitModal.bind(this);
        this.toggleEditCircuitModal = this.toggleEditCircuitModal.bind(this);
    };

    componentDidMount() {
        this._refreshCircuits();
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

    addCircuit = _ => {
        let { newCircuitData } = this.state;

        fetch(`http://localhost:4000/circuits/add?name=${newCircuitData.name}&initial_location=${newCircuitData.initial_location}&final_location=${newCircuitData.final_location}&time=${newCircuitData.time}&velocity=${newCircuitData.velocity}&distance=${newCircuitData.distance}&calories=${newCircuitData.calories}&partner_id=${newCircuitData.partner_id}`)
            .then(this._refreshCircuits)
            .catch(err => console.error(err))
    }

    updateCircuit = _ => {
        let { editCircuitData } = this.state;

        fetch(`http://localhost:4000/circuits/edit?circuit_id=${editCircuitData.id}&name=${editCircuitData.name}&initial_location=${editCircuitData.initial_location}&final_location=${editCircuitData.final_location}&time=${editCircuitData.time}&velocity=${editCircuitData.velocity}&distance=${editCircuitData.distance}&calories=${editCircuitData.calories}&partner_id=${editCircuitData.partner_id}`)
            .then(this._refreshCircuits)
            .catch(err => console.error(err))
    }

    editCircuit(id, name, initial_location, final_location, time, distance, velocity, calories, partner_id) {
        this.setState({
            editCircuitData: { id, name, initial_location, final_location, time, distance, velocity, calories, partner_id }, editCircuitModal: !this.state.editCircuitModal
        });
    }

    deleteCircuit(id) {
        fetch(`http://localhost:4000/circuits/delete?circuit_id=${id}`)
            .then(this._refreshCircuits)
            .catch(err => console.error(err))
    }

    _refreshCircuits = _ => {
        fetch('http://localhost:4000/circuits/')
            .then(response => response.json())
            .then(response => this.setState({
                circuits: response.data,
                newCircuitModal: false, newCircuitData: {
                    name: '',
                    initial_location: '',
                    final_location: '',
                    time: '',
                    distance: 0,
                    velocity: 0,
                    calories: 0,
                    partner_id: 0
                },
                editCircuitModal: false, editCircuitData: {
                    id: '',
                    name: '',
                    initial_location: '',
                    final_location: '',
                    time: '',
                    distance: 0,
                    velocity: 0,
                    calories: 0,
                    partner_id: 0
                }
            }))
            .catch(err => console.log(err))
    }

    renderCircuit = ({ circuit_id, name, initial_location, final_location, time, distance, velocity, calories, partner_id }) =>
        <tr key={circuit_id}>
            <td>{name}</td>
            <td>{initial_location}</td>
            <td>{final_location}</td>
            <td>{time}</td>
            <td>{distance}</td>
            <td>{velocity}</td>
            <td>{calories}</td>
            <td>{partner_id}</td>
            <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editCircuit.bind(this, circuit_id, name, initial_location, final_location, time, distance, velocity, calories, partner_id)}>Editar</Button>
                <Button color="danger" size="sm" onClick={this.deleteCircuit.bind(this, circuit_id)}>Apagar</Button>
            </td>
        </tr>

    render() {
        const { circuits, newCircuitData, editCircuitData } = this.state;

        return (
            <div className="containerTable">
                <Row className="justify-content-center">
                    <Button variant="dark" onClick={this.toggleNewCircuitModal}>Adicionar Circuito</Button>
                </Row>

                <Row>
                    <Modal isOpen={this.state.newCircuitModal} toggle={this.toggleNewCircuitModal}>
                        <ModalHeader toggle={this.toggleNewCircuitModal}>Adicionar um novo circuito</ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input id="name" placeholder="Insira o nome"
                                    value={newCircuitData.name}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, name: e.target.value } })}
                                />
                            </FormGroup>

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

                            <FormGroup>
                                <Label for="partner_id">ID do Sócio</Label>
                                <Input id="partner_id" type="number"
                                    value={newCircuitData.partner_id}
                                    onChange={e => this.setState({ newCircuitData: { ...newCircuitData, partner_id: e.target.value } })} />
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
                                <Label for="name">Nome</Label>
                                <Input id="name" placeholder="Insira o nome"
                                    value={editCircuitData.name}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, name: e.target.value } })}
                                />
                            </FormGroup>

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

                            <FormGroup>
                                <Label for="partner_id">ID do Sócio</Label>
                                <Input id="partner_id" type="number"
                                    value={editCircuitData.partner_id}
                                    onChange={e => this.setState({ editCircuitData: { ...editCircuitData, partner_id: e.target.value } })} />
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
                                <th>Nome</th>
                                <th>Localização Inicial</th>
                                <th>Localização Final</th>
                                <th>Duração</th>
                                <th>Distância</th>
                                <th>Velocidade</th>
                                <th>Calorias</th>
                                <th>ID do Sócio</th>
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