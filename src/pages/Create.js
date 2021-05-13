import axios from 'axios';
import React, {Component} from 'react';
import {BsUpload} from 'react-icons/bs';
import {Redirect} from 'react-router';
import Cookies from 'universal-cookie';
import Nav from '../components/Nav'

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', content: '', file: null, loggedIn: false,loginFailed:false};
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
    formData.append('title',this.state.title)
    formData.append('content',this.state.content)
    //dont forget the user data too
    const cookie = new Cookies();
    const token = cookie.get('token')
    if(!token) return this.setState({loginFailed:true})
    axios.post("http://localhost:5000/posts/create",formData,{
      headers:{'authorization':"Bearer "+token}
    }).then( res =>{
      console.log('new post creted')
    })
  };
  render() {
    return (
      <>
      <Nav loggedIn={true} />
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <h1>Create</h1>
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
          <button type="submit">
            upload <BsUpload />{' '}
          </button>
        </form>
      </div></>
    );
  }
}
