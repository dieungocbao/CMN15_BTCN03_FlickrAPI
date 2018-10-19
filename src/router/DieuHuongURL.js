import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Explore from '../Components/Explore';
import Tag from '../Components/Tag';
import Photo from '../Components/Photo';


export default class DieuHuongURL extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Explore} />
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/tags/:id" component={Tag} />
                <Route exact path="/photos/:id" component={Photo} />
            </div>
        )
    }
}
