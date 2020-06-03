import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      title: "",
      author: "Anonymous",
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
        // let myString = JSON.stringify(response.data, "", " ")
        //   .trim()
        //   .replace("{", "")
        //   .replace("}", "");

        //console.log(myString);
        // console.log(response.data.title);
        // console.log(response.data.author);
        // console.log(response.data.type);
        // console.log(response.data.key);
        // console.log(response.data.journal);
        // console.log(response.data.pages);
        // console.log(response.data.volume);
        // console.log(response.data.annote);
        // console.log(response.data.publisher);
        // console.log(response.data.method);
        // console.log(response.data.participants);
        // console.log(response.data.year);
        // console.log(response.data.month);

        this.setState(response.data);
        // this.setState({ title: response.data.title });
        // this.setState({ author: response.data.author });
        // this.setState({ type: response.data.type });
        // this.setState({ key: response.data.key });
        // this.setState({ journal: response.data.journal });
        // this.setState({ pages: response.data.pages });
        // this.setState({ volume: response.data.volume });
        // this.setState({ annote: response.data.annote });
        // this.setState({ publisher: response.data.publisher });
        // this.setState({ method: response.data.method });
        // this.setState({ participants: response.data.participants });
        // this.setState({ year: response.data.year });
        // this.setState({ month: response.data.month });
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
        <p>
          <b>Type: </b>
          {this.state.type}
        </p>
        <p>
          <b>Journal: </b>
          {this.state.journal}
        </p>
        <p>
          <b>Pages: </b>
          {this.state.pages}
        </p>
        <p style={{ visibility: this.state.volume ? "visible" : "collapse" }}>
          <b>volume: </b>
          {this.state.volume}
        </p>
        <p>
          <b>Annote: </b>
          {this.state.annote}
        </p>
        <p>
          <b>Publisher: </b>
          {this.state.publisher}
        </p>
        <p>
          <b>Method: </b>
          {this.state.method}
        </p>
        <p>
          <b>Participants: </b>
          {this.state.participants}
        </p>
        <p>
          <b>Year: </b>
          {this.state.year}
        </p>
        <p>
          <b>Month: </b>
          {this.state.month}
        </p>
      </div>
    );
  }
}
//
