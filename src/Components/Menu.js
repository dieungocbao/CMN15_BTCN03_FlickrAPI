import React, { Component } from 'react'
import logo from "../img/logo.png"
import './css/menu.css'

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: this.props.tag,
        }
    }
    handleChange = (e) => {
        this.setState({
            tag: e.target.value
        })
    }

    render() {
        const { tag } = this.state
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand py-0" href="/"><img src={logo} alt="brand" width="80" height="40" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-item nav-link py-0" href="/">Khám phá</a>
                                </li>
                            </ul>
                            <div className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" aria-label="Search" name="tag" value={(tag) ? tag : ''} onChange={this.handleChange} />
                                <a className="btn btn-outline-success my-2 my-sm-0" href={'/tags/' + tag}>Search</a>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
