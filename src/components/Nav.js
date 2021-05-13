import React from 'react';

import logo from '../logo.svg';
import {CgLogIn} from 'react-icons/cg';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {MdCreate} from 'react-icons/md';
import {BiSearchAlt} from 'react-icons/bi';
import {FaHome} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import {BsInfoCircle} from 'react-icons/bs'

export default function Nav() {
  return (
    <nav className="Nav">
      <img src={logo} alt="logo" className="nav-img" />
      <NavLink exact activeClassName="active" to="/login">
        <CgLogIn /> Login
      </NavLink>
      <NavLink exact activeClassName="active" to="/">
        <FaHome /> Home
      </NavLink>
      <NavLink exact activeClassName="active" to="/register">
        <AiOutlineUserAdd /> register
      </NavLink>
      <NavLink exact activeClassName="active" to="/create">
        <MdCreate /> create
      </NavLink>
      <NavLink exact activeClassName="active" to="/search">
        <BiSearchAlt /> search
      </NavLink>
      <NavLink exact activeClassName="active" to="/search">
        <BsInfoCircle /> about
      </NavLink>
    </nav>
  );
}
