import React, {Component} from 'react';
import {CgLogIn} from 'react-icons/cg';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '',password: '',loggedIn: false};
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.email,this.state.password);
    this.setState({loggedIn: true});
  };
  render() {
    if (!this.state.loggedIn)
      {return (
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
            <label htmlFor="confirm password">confirm password</label>
            <br />
            <input
              onChange={this.handleChange}
              name="confirm password"
              type="password"
              placeholder="confirm password"
              required
            />
            <br />
            <button type="submit">
              submit <CgLogIn />{' '}
            </button>
            <div class="form-ques">
              <p>
                already have an account ?
                <br/><Link to="/login">login here</Link>
              </p>
            </div>
          </form>
        </div>
      );}
    else {return <Redirect exact to="/" />;}
  }
}
