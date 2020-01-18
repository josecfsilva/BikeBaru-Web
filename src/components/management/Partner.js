import React from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import { Row } from "react-bootstrap";

const SERVER_URL = 'https://bikebaru-server.herokuapp.com';

export default class Partner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: [],
            newPartnerData: {
                name: '',
                nickname: '',
                password: '',
                circuits: 0,
                time: '',
                events: 0,
                awards: 0
            },
            editPartnerData: {
                id: '',
                name: '',
                nickname: '',
                password: '',
                circuits: 0,
                time: '',
                events: 0,
                awards: 0
            },
            newPartnerModal: false,
            editPartnerModal: false,
        }
        this.toggleNewPartnerModal = this.toggleNewPartnerModal.bind(this);
        this.toggleEditPartnerModal = this.toggleEditPartnerModal.bind(this);
    };

    componentDidMount() {
        this.loadPartners();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleNewPartnerModal() {
        this.setState({
            newPartnerModal: !this.state.newPartnerModal
        });
    }

    toggleEditPartnerModal() {
        this.setState({
            editPartnerModal: !this.state.editPartnerModal
        });
    }

    /* Add Partner */
    addPartner = () => {
        let { newPartnerData } = this.state;

        fetch(SERVER_URL + '/partners/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newPartnerData.name,
                nickname: newPartnerData.nickname,
                password: newPartnerData.password,
                circuits: newPartnerData.circuits,
                time: newPartnerData.time,
                events: newPartnerData.events,
                awards: newPartnerData.awards
            })
        })
            .then(this.loadPartners)
            .catch(err => console.error(err));
    }

    /* Edit Partner */
    updatePartner = () => {
        let { editPartnerData } = this.state;

        fetch(SERVER_URL + '/partners/edit/' + editPartnerData.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                partner_id: editPartnerData.id,
                name: editPartnerData.name,
                nickname: editPartnerData.nickname,
                password: editPartnerData.password,
                circuits: editPartnerData.circuits,
                time: editPartnerData.time,
                events: editPartnerData.events,
                awards: editPartnerData.awards
            })
        })
            .then(this.loadPartners)
            .catch(err => console.error(err));
    }

    editPartner(id, name, nickname, password, circuits, time, events, awards) {
        this.setState({
            editPartnerData: { id, nickname, name, password, circuits, time, events, awards }, editPartnerModal: !this.state.editPartnerModal
        });
    }

    /* Delete Partner */
    deletePartner = (id) => {
        fetch(SERVER_URL + '/partners/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(this.loadPartners)
            .catch(err => console.error(err));
    }

    /* Get Partners */
    loadPartners = () => {
        fetch(SERVER_URL + '/partners/')
            .then(response => response.json())
            .then(response => this.setState({
                partners: response.data,
                newPartnerModal: false, newPartnerData: {
                    name: '',
                    nickname: '',
                    password: '',
                    circuits: 0,
                    time: '',
                    events: 0,
                    awards: 0
                },
                editPartnerModal: false, editPartnerData: {
                    id: '',
                    nickname: '',
                    name: '',
                    password: '',
                    circuits: 0,
                    time: '',
                    events: 0,
                    awards: 0
                }
            }))
            .catch(err => console.log(err))
    }

    renderPartner = ({ partner_id, name, nickname, password, circuits, time, events, awards }) =>
        <tr key={partner_id}>
            <td>{name}</td>
            <td>{nickname}</td>
            <td>{password}</td>
            <td>{circuits}</td>
            <td>{time}</td>
            <td>{events}</td>
            <td>{awards}</td>
            <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editPartner.bind(this, partner_id, name, nickname, password, circuits, time, events, awards)}>Editar</Button>
                <Button color="danger" size="sm" onClick={this.deletePartner.bind(this, partner_id)}>Apagar</Button>
            </td>
        </tr>

    render() {
        const { partners, newPartnerData, editPartnerData } = this.state;

        return (
            <div className="containerTable">
                <h4 style={{ textAlign: "center" }}>Sócios</h4>

                <Row className="justify-content-center">
                    <Button variant="dark" onClick={this.toggleNewPartnerModal}>Adicionar</Button>
                </Row>

                <Row>
                    <Modal isOpen={this.state.newPartnerModal} toggle={this.toggleNewPartnerModal}>
                        <ModalHeader toggle={this.toggleNewPartnerModal}>Adicionar um novo sócio</ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input id="name" placeholder="Insira o nome"
                                    value={newPartnerData.name}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, name: e.target.value } })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input id="nickname" placeholder="Insira o nickname"
                                    value={newPartnerData.nickname}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, nickname: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" placeholder="Insira a password"
                                    value={newPartnerData.password}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, password: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="circuits">Circuitos Efetuados</Label>
                                <Input id="circuits" type="number"
                                    value={newPartnerData.circuits}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, circuits: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="time">Melhor Tempo</Label>
                                <Input id="time" type="time" placeholder="Insira o melhor tempo"
                                    value={newPartnerData.time}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, time: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="events">Provas Participadas</Label>
                                <Input id="events" type="number"
                                    value={newPartnerData.events}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, events: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="awards">Prémios Ganhos</Label>
                                <Input id="awards" type="number"
                                    value={newPartnerData.awards}
                                    onChange={e => this.setState({ newPartnerData: { ...newPartnerData, awards: e.target.value } })} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.addPartner}>Adicionar Sócio</Button>
                            <Button color="secondary" onClick={this.toggleNewPartnerModal}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </Row>

                <Row>
                    <Modal isOpen={this.state.editPartnerModal} toggle={this.toggleEditPartnerModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditPartnerModal.bind(this)}>Editar dados do sócio</ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input id="name" placeholder="Insira o nome"
                                    value={editPartnerData.name}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, name: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input id="nickname" placeholder="Insira o nickname"
                                    value={editPartnerData.nickname}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, nickname: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" placeholder="Insira a password"
                                    value={editPartnerData.password}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, password: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="circuits">Circuitos Efetuados</Label>
                                <Input id="circuits" type="number"
                                    value={editPartnerData.circuits}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, circuits: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="time">Melhor Tempo</Label>
                                <Input id="time" type="time" placeholder="Insira o melhor tempo"
                                    value={editPartnerData.time}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, time: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="events">Provas Participadas</Label>
                                <Input id="events" type="number"
                                    value={editPartnerData.events}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, events: e.target.value } })} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="awards">Prémios Ganhos</Label>
                                <Input id="awards" type="number"
                                    value={editPartnerData.awards}
                                    onChange={e => this.setState({ editPartnerData: { ...editPartnerData, awards: e.target.value } })} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.updatePartner}>Editar Sócio</Button>
                            <Button color="secondary" onClick={this.toggleEditPartnerModal.bind(this)}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </Row>

                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Nickname</th>
                                <th>Password</th>
                                <th>Circuitos Efetuados</th>
                                <th>Melhor Tempo</th>
                                <th>Provas Participadas</th>
                                <th>Prémios Ganhos</th>
                            </tr>
                        </thead>

                        <tbody>
                            {partners.map(this.renderPartner)}
                        </tbody>
                    </Table>
                </Row>
            </div>
        );
    }
}
