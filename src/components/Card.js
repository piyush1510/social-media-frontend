import React, {Component} from 'react';
import {BiLike} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }
  loadHandler = () => {
    this.setState({loading: false});
  };
  likeButtonClick = () => {
    console.log('liked');
  };
  render() {
    return (
      <div className="Card">
        <div className="upper-part">
          <img
            src="http://bestprofilepix.com/wp-content/uploads/2014/03/sad-and-alone-boys-facebook-profile-pictures.jpg"
            alt="yo"
          />
          <h2>{this.props.title}</h2>
        </div>
        <div className="middle-part">
          <img
            onLoad={this.loadHandler}
            style={{display: this.state.loading ? 'none' : 'block'}}
            src={"http://localhost:5000/"+this.props.imgLink}
            alt={this.props.title}
          />
          {this.state.loading ? <Spinner /> : <></>}
        </div>
        <div className="lower-up-part">
          <p>{new Date(this.props.time).toDateString()}</p>
          <div className="likes">
            <button className="like-button" onClick={this.likeButtonClick}>
              <BiLike />
            </button>
            <p>likes {this.props.likes}</p>
          </div>
        </div>
        <div className="lower-part">
          <p>{this.props.para.substr(0, 100)}</p>
          <Link to="/login"><button className="read-more">read more</button></Link>
        </div>
      </div>
    );
  }
}
