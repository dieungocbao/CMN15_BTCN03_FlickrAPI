import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Axios from 'axios';
import Menu from './Menu'
import './css/tag.css'

const api = {
    api_key: '3223e0cece13a5c1ff8ee617b609e5b4'
}

export default class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            images: [],
            hasMoreItems: true,
            pages: 1
        }
    }
    loadItems = () => {
        var images = this.state.images
        var pages = this.state.pages
        var id = this.state.id
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + api.api_key + '&tags=' + id + '&extras=owner_name%2Cviews&per_page=20&page=' + pages + '&format=json&nojsoncallback=1'
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
        const { id, images, hasMoreItems } = this.state
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
            return (items.push(<div className="wrapper" key={index}>
                <a href={'/photos/' + photo.id}>
                    <img src={src} alt={photo.title} className="image img-responsive" />
                    <div className="middle">
                        <div className="text">
                            <p className="title">{photo.title}</p>
                            <p className="owner">by {photo.ownername}</p>
                            <p className="views">Views: {photo.views}</p>
                        </div>
                    </div>
                </a>
            </div>
            ))
        })
        return (
            <div>
                <Menu tag={id}></Menu>
                <div className="container">
                    <h4 className="title">Từ khóa: {id}</h4>
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
        )
    }
}
