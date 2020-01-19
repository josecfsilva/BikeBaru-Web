import React from 'react'

const SERVER_URL = 'https://bikebaru-server.herokuapp.com';

export default class Robots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: []
        }
    };

    componentDidMount() {
        this.loadRobots();
    }

    loadRobots = () => {
        fetch(SERVER_URL + '/robots/')
            .then((r) => r.text())
            .then(text => {
                this.setState({
                    robots: text,
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Robots</h1>
                <div>
                    {this.state.robots}
                </div>
            </div >
        )
    }
}
