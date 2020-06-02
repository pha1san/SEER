import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
constructor(props) {
    super(props);

    this.state = {
    searchText: "",
    };
}

onSubmit = (e) => {
    e.preventDefault();

    // const searchText = {
    //   text: this.state.searchText,
    // };
};

onChangeText = (e) => {
    this.setState({
    searchText: e.target.value,
    });
};

render() {
    return (
    <div>
        <h3>Search Articles</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>SEARCH: </label>
            <input
            type="text"
            className="form-control"
            value={this.state.searchText}
            onChange={this.onChangeText}
            placeholder="Search..."
            />
        </div>
        <div className="form-group">
            <Link
            to={{
                pathname: "/article",
                state: {
                searchText: this.state.searchText,
                },
            }}
            >
            <input
                type="submit"
                value="Search Articles"
                className="btn btn-primary"
            />
            </Link>
        </div>
        </form>
    </div>
    );
 }
}
