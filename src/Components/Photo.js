import React, { Component } from 'react'
import Axios from 'axios';
import Menu from './Menu'
import './css/photo.css'


const api = {
    api_key: '3223e0cece13a5c1ff8ee617b609e5b4'
}

export default class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            photo: '',
            person: ''
        }
    }

    componentWillMount = () => {
        let { id } = this.state
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + api.api_key + '&extras=count_faves&photo_id=' + id + '&format=json&nojsoncallback=1'
        Axios.get(url)
            .then(res => {
                let photo = res.data.photo
                this.setState({
                    photo: photo
                })
                return Axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=' + api.api_key + '&user_id=' + photo.owner.nsid + '&format=json&nojsoncallback=1')
            })
            .then(res => {
                let person = res.data.person
                this.setState({
                    person: person
                })
            })
    }

    render() {
        const { photo, person } = this.state
        return (
            <div>
                <Menu></Menu>
                {photo && person &&
                    <div className="white-background">
                        <div className="photo">
                            <img src={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg'} alt={photo.title} />
                        </div>
                        <div className="container photo-detail">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="photo-info">
                                        <div className="row">
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                <img src={'http://farm' + person.iconfarm + '.staticflickr.com/' + person.iconserver + '/buddyicons/' + person.nsid + '.jpg'} alt={photo.owner.username} className="rounded-circle" />
                                            </div>
                                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                                <h5><strong>{(photo.owner.realname) ? photo.owner.realname : photo.owner.username}</strong></h5>
                                                <h6><strong>{photo.title._content}</strong></h6>
                                                <p>{photo.description._content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="row">
                                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                            <p className="number">{photo.views}</p>
                                            <p className="text-bt">views</p>
                                        </div>
                                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                            <p className="number">{photo.count_faves}</p>
                                            <p className="text-bt">likes</p>
                                        </div>
                                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                            <p className="number">{photo.comments._content}</p>
                                            <p className="text-bt">comments</p>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <p className="number">{photo.dates.taken}</p>
                                            <p className="text-bt">date uploaded</p>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        <h5>tags:</h5>
                                        {photo.tags.tag.map((tag, index) => {
                                            return <a href={'/tags/' + tag.raw} className="btn btn-outline-info" key={index}>{tag.raw}</a>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
