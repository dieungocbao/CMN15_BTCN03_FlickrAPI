import React, { Component } from 'react'
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import './css/explore.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const api = {
    api_key: '3223e0cece13a5c1ff8ee617b609e5b4'
}
export default class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            hasMoreItems: true,
            pages: 1
        }
    }
    loadItems = () => {
        var images = this.state.images
        var pages = this.state.pages
        var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=' + api.api_key + '&extras=owner_name%2Cviews&per_page=20&page=' + pages + '&format=json&nojsoncallback=1'
        Axios.get(url)
            .then(res => {
                const data = res.data.photos.photo
                data.map((photo) => {
                    return images.push(photo)
                })
                if (data) {
                    this.setState({
                        images: images,
                        pages: pages + 1,
                    })
                } else {
                    this.setState({
                        hasMoreItems: false
                    })
                }
            })
    }

    render() {
        const { images, hasMoreItems } = this.state
        const loader = <div className="loader" key={0}>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        var items = []
        images.map((photo, index) => {
            let src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
            return (items.push(
                <div className="wrapper" key={index}>
                    <Link to={'/photos/' + photo.id}>
                        <img src={src} alt={photo.title} className="image img-responsive" />
                        <div className="middle">
                            <div className="text">
                                <p className="title">{photo.title}</p>
                                <p className="owner">by {photo.ownername}</p>
                                <p className="views">Views: {photo.views}</p>
                            </div>
                        </div>
                    </Link>
                </div>

            ))
        })
        return (
            <div>
                <div className="container">
                    <h4 className="title">Khám phá</h4>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadItems}
                        hasMore={hasMoreItems}
                        loader={loader}
                    >
                        <div>
                            {items}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
