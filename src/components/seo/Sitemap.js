import React from 'react'

const SERVER_URL = 'https://bikebaru-server.herokuapp.com';

export default class Robots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitemap: []
        }
    };

    componentDidMount() {
        this.loadSitemap();
    }

    loadSitemap = () => {
        fetch(SERVER_URL + '/sitemap/')
            .then((r) => r.text())
            .then(text => {
                this.setState({
                    sitemap: text,
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Sitemap</h1>
                <div>
                    {this.state.sitemap}
                </div>
            </div >
        )
    }
}
