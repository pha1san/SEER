import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      selection: "title",
    };
  }

  onChangeText = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  onSelected = (e) => {
    this.setState({
      selection: e.target.value,
    });
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          value={this.state.searchText}
          onChange={this.onChangeText}
          placeholder="Search articles..."
        />
        <div className="input-group-append">
          <select
            className="btn btn-outline-secondary"
            required
            value={this.state.selection}
            onChange={this.onSelected}>
            <option key={"title"} value={"title"}>
              Title
            </option>
            <option key={"author"} value={"author"}>
              Author
            </option>
            <option key={"publisher"} value={"publisher"}>
              Publisher
            </option>
            <option key={"method"} value={"method"}>
              Methodology
            </option>
            <option key={"participants"} value={"participants"}>
              Participants
            </option>
            <option key={"journal"} value={"journal"}>
              Journal
            </option>
          </select>
          <Link
            className="btn btn-outline-secondary"
            type="button"
            to={{
              pathname: "/article/role=searcher",
              state: {
                searchText: this.state.searchText,
                searchField: this.state.selection,
              },
            }}>
            Search Articles
          </Link>
        </div>
      </div>
    );
  }
}
