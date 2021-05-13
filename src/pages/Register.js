import React, {Component} from 'react';
import {CgLogIn} from 'react-icons/cg';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
import Nav from '../components/Nav'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '',name:'',file:null};
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
    formData.append('email', this.state.email);
    formData.append('name', this.state.name);
    formData.append('password', this.state.password);
    //dont forget the user data too
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (!token) return this.setState({loginFailed: true});
    axios
      .post('http://localhost:5000/user/create', formData, {
        headers: {authorization: 'Bearer ' + token},
      })
      .then((res) => {
        console.log('new user created');
      });
  };
  render() {
      return (
        <>
        <Nav loggedIn={false}/>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="email">email</label>
            <br />
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              placeholder="email"
              required
            />
            <br />
            <label htmlFor="name">name</label>
            <br />
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              placeholder="name"
              required
            />
            <br />
            <label htmlFor="password">password</label>
            <br />
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <br />
          <label htmlFor="image-upload">profile pic</label>
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
              register <CgLogIn />{' '}
            </button>
            <div className="form-ques">
              <p>
                already have an account ?
                <br />
                <Link to="/login">login here</Link>
              </p>
            </div>
          </form>
        </div>
        </>
      );
    }
}
