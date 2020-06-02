import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      author: "",
    };
  }
  componentDidMount() {
    axios
      .get("/entries/" + this.props.match.params.id)
      .then((response) => {
        let myString = JSON.stringify(response.data, "", " ")
          .trim()
          .replace("{", "")
          .replace("}", "");
        console.log(myString);
        console.log(response.data.author);
        this.setState({ author: response.data.author})
        this.setState({ article: myString.replace(",", "\n") });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>{this.state.article}</p>
          <p><b>Author: </b>{this.state.author}</p> 
      </div>
    );
  }
}
//
