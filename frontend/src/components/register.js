import React, { Component } from "react";
// import SearchBar from "./userLogin";
// import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  /*
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    //axios.post("/users/add", user).then((res) => console.log(res.data));

    this.setState({
      username: "",
      password:"",
    });
  };
*/

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              //value={this.state.username}
              //onChange={this.onChangeUsername}
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              required
              className="form-control"
              // value={this.state.password}
              // onChange={this.onChangeUsername}
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
