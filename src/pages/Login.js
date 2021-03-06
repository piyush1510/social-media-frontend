import axios from 'axios';
import React, {Component} from 'react';
import {CgLogIn} from 'react-icons/cg';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Nav from '../components/Nav'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', loggedIn: false,loginFail:false};
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/login',{email:this.state.email,password:this.state.password}).then(res=>{
      const cookies = new Cookies();
      cookies.set('token',res.data.token)
      this.setState({loggedIn:true})
    })
    .catch(err=>{
      this.setState({loginFail:true})
    })
  };
  render() {
    if (!this.state.loggedIn) {
      return (
        <>
        <Nav loggedIn={false}/>
        <div className="form login">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <p className={"error-login" + (this.state.loginFail?'':' hidden')}>
              * username or password is incorrect
            </p>
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
            <button type="submit">
              submit <CgLogIn />{' '}
            </button>
            <div className="form-ques">
              <p>
                no account yet ? <Link to="/register">register here</Link>
              </p>
            </div>
          </form>
        </div>
        </>
      );
    } else {
      return <Redirect exact to="/" />;
    }
  }
}
