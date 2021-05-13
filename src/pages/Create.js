import axios from 'axios';
import React, {Component} from 'react';
import {BsUpload} from 'react-icons/bs';
import {Redirect} from 'react-router';
import Cookies from 'universal-cookie';
import Nav from '../components/Nav';
import Spinner from '../components/Spinner'

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      file: null,
      loggedIn: true,
      loginFailed: false,
      loading: false,
      ableToSend: true,
      submit: false,
    };
  }
  handleFileChange = (e) => {
    this.setState({file: e.target.files[0]});
  };
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file, this.state.file.name);
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (!token) return this.setState({loginFailed: true});
    this.setState({loading: true});
    axios
      .post('http://localhost:5000/posts/create', formData, {
        headers: {authorization: 'Bearer ' + token},
      })
      .then((res) => {
        this.setState({loading:false,submit:true})
      })
      .catch((err) => {
        if(err.response.status===401) return this.setState({loginFailed:true})
        this.setState({loading:false,submit:true,ableToSend:false})
      });
  };
  render() {
    return (
      <>
        {this.state.loginFailed? <Redirect to="/login"/>:<></>}
        <Nav loggedIn={true} />
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1>Create</h1>
            <p className={!this.state.loading&&this.state.submit&&this.state.ableToSend?"success":"hidden"}>* post created</p>
            <p className={!this.state.loading&&this.state.submit&&!this.state.ableToSend?"error":"hidden"}>* there was an error</p>
            <label htmlFor="email">Title</label>
            <br />
            <input
              onChange={this.handleChange}
              name="title"
              type="text"
              placeholder="title"
              required
            />
            <br />
            <label htmlFor="content">content</label>
            <br />
            <textarea
              onChange={this.handleChange}
              name="content"
              type="text"
              placeholder="content"
              required
            />
            <br />
            <label htmlFor="image-upload">upload an image</label>
            <br />
            <input
              onChange={this.handleFileChange}
              name="image"
              type="file"
              accept=".jpg,jpeg,.png"
              required
            />
            <br />
            {this.state.loading?<Spinner radius={30}/>:<button type="submit">
              upload <BsUpload />{' '}
            </button>}
            
          </form>
        </div>
      </>
    );
  }
}
