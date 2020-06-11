import React, { Component } from "react";
import SearchBar from "./userLogin";
import axios from "axios";


export default class UserLoginTest extends Component {
    constructor(props) {
    super(props);

    this.state = {
        username: "",
        password: "",
        submitted: false,
        loading: false,
        error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value});
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({submitted: true});
        const { username, password, returnUrl } = this.state;

        if(!(username && password)){
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
            
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
    const { username, password, submited, loading, error} = this.state;
    return (
    <div>
        <h3>Login</h3>
        <form name = "login" onSubmit={this.handleSubmit}>
        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor="username">Username: </label>
            <input
            type="text"
            className="form-control"
            name = "username"
            value = {username}
            onChange={this.handleChange}
              //value={this.state.username}
              //onChange={this.onChangeUsername}
              //onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            {submitted && !username &&
                <div className="help-block">Username required.</div>
            }
        </div>

        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password: </label>
            <input
            type="password"
            className="form-control"
            name = "password"
            value = {password}
              //value={this.state.password}
              //onChange={this.onChangeUsername}
            onChange = {this.handleChange}
            />
            {submitted && !password &&
                <div className="help-block">Password required.</div>
            }
        </div>
        <div className="form-group">
            <button className = "btn btn-primary"
            disabled={loading}>Login</button>
            {loading &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
        </div>
        {error &&
            <div className = {'alert alert-danger'}>{error}</div>
        }
        </form>
    </div>
    );
    }
}

const formStyle = {
width: "55%",
  //position: "absolute",
left: "50%",
top: "50%",
  //transform: "translate(-50%, -50%)",
};
