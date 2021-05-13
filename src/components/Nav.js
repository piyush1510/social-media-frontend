import React from 'react';

import logo from '../logo.svg';
import {CgLogIn} from 'react-icons/cg';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {MdCreate} from 'react-icons/md';
import {BiSearchAlt} from 'react-icons/bi';
import {FaHome} from 'react-icons/fa';
import {NavLink, Redirect} from 'react-router-dom';
import {BsInfoCircle} from 'react-icons/bs';
import Cookies from 'universal-cookie'

export default class Nav extends React.Component {
  constructor(props){
    super(props)
    this.state={logoutClick:false}
  }
  logOut = ()=>{
    const cookie = new Cookies();
    cookie.remove('token')
    this.setState({logoutClick:true})
  }
  render() {
    if(this.state.logoutClick) return <Redirect to="/login" />
    return (
      <>
      <header><img src={logo} alt="logo" className="logo-img" /></header>
      <nav className="Nav">
        
        <NavLink exact activeClassName="active" to="/search">
          <BsInfoCircle /> about
        </NavLink>
        {this.props.loggedIn ? (
          <>
            <NavLink exact activeClassName="active" to="/">
              <FaHome /> Home
            </NavLink>
            <NavLink exact activeClassName="active" to="/create">
              <MdCreate /> create
            </NavLink>
            <NavLink exact activeClassName="active" to="/search">
              <BiSearchAlt /> search
            </NavLink>
            <button onClick={this.logOut}>logout</button>
          </>
        ) : (
          <>
            <NavLink exact activeClassName="active" to="/login">
              <CgLogIn /> Login
            </NavLink>
            <NavLink exact activeClassName="active" to="/register">
              <AiOutlineUserAdd /> register
            </NavLink>
          </>
        )}
      </nav>
      </>
    );
  }
}

