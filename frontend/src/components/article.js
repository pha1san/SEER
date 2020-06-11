import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      title: "",
      author: "",
      type: "",
      key: "",
      journal: "",
      pages: "",
      volume: "",
      annote: "",
      publisher: "",
      method: "",
      participants: "",
      year: "",
      month: "",
    };
  }

  componentDidMount() {
    axios
      .get("/entries/id" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.article}</p>
        <h3>{this.state.title} </h3>
        <h6>{this.state.author} </h6>
        <hr />
        <p style={{ display: this.state.type ? "" : "none" }}>
          <b>Type: </b>
          {this.state.type}
        </p>
        <p style={{ display: this.state.journal ? "" : "none" }}>
          <b>Journal: </b>
          {this.state.journal}
        </p>
        <p style={{ display: this.state.pages ? "" : "none" }}>
          <b>Pages: </b>
          {this.state.pages}
        </p>
        <p style={{ display: this.state.volume ? "" : "none" }}>
          <b>volume: </b>
          {this.state.volume}
        </p>
        <p style={{ display: this.state.annote ? "" : "none" }}>
          <b>Annote: </b>
          {this.state.annote}
        </p>
        <p style={{ display: this.state.publisher ? "" : "none" }}>
          <b>Publisher: </b>
          {this.state.publisher}
        </p>
        <p style={{ display: this.state.method ? "" : "none" }}>
          <b>Method: </b>
          {this.state.method}
        </p>
        <p style={{ display: this.state.participants ? "" : "none" }}>
          <b>Participants: </b>
          {this.state.participants}
        </p>
        <p style={{ display: this.state.year ? "" : "none" }}>
          <b>Year: </b>
          {this.state.year}
        </p>
        <p style={{ display: this.state.month ? "" : "none" }}>
          <b>Month: </b>
          {this.state.month}
        </p>
        <hr />
      </div>
    );
  }
}
//
