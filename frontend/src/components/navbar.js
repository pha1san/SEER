import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          SEER
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/article/role=searcher" className="nav-link">
                Article List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/submit" className="nav-link">
                Submit Articles
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=moderator" className="nav-link">
                Moderator List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=analyst" className="nav-link">
                Analyst List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/article/role=admin" className="nav-link">
                Admin List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
