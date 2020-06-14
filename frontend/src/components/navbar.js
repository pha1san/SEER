import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./SEERhomeimage2copy.jpg";

const logoStyle = {
  width: "50px",
  borderRadius: "50%",
};
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          <img src={logo} style={logoStyle} alt="logo" />
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link href="%PUBLIC_URL%/SEERlogo.png" to="/article/role=searcher" className="nav-link">
                Article List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/submit" className="nav-link">
                Submit Articles
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=moderator" className="nav-link">
                Moderator Queue
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=analyst" className="nav-link">
                Analyst Queue
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=admin" className="nav-link">
                Admin List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
