import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class submitArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onChangeJournal = this.onChangeJournal.bind(this);
    this.onChangePages = this.onChangePages.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeAnnote = this.onChangeAnnote.bind(this);
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.onChangeParticipants = this.onChangeParticipants.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);

    this.state = {
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeKey(e) {
    this.setState({
      key: e.target.value,
    });
  }

  onChangeJournal(e) {
    this.setState({
      journal: e.target.value,
    });
  }

  onChangePages(e) {
    this.setState({
      pages: e.target.value,
    });
  }

  onChangeVolume(e) {
    this.setState({
      volume: e.target.value,
    });
  }

  onChangeAnnote(e) {
    this.setState({
      annote: e.target.value,
    });
  }

  onChangePublisher(e) {
    this.setState({
      publisher: e.target.value,
    });
  }

  onChangeMethod(e) {
    this.setState({
      method: e.target.value,
    });
  }

  onChangeParticipants(e) {
    this.setState({
      participants: e.target.value,
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  onChangeMonth(e) {
    this.setState({
      month: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/entries/add", this.state)
      .then((res) => {
        alert(res.data);
        window.location = "/article/role=searcher";
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <div>
        <h3>Submit Article</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
          </div>
          <div className="form-group">
            <label>Type: </label>
            <input type="text" required className="form-control" value={this.state.type} onChange={this.onChangeType} />
          </div>
          <div className="form-group">
            <label>Key: </label>
            <input type="text" className="form-control" value={this.state.key} onChange={this.onChangeKey} />
          </div>
          <div className="form-group">
            <label>Journal: </label>
            <input type="text" className="form-control" value={this.state.journal} onChange={this.onChangeJournal} />
          </div>
          <div className="form-group">
            <label>Pages: </label>
            <input type="text" className="form-control" value={this.state.pages} onChange={this.onChangePages} />
          </div>
          <div className="form-group">
            <label>Volume: </label>
            <input type="text" className="form-control" value={this.state.volume} onChange={this.onChangeVolume} />
          </div>
          <div className="form-group">
            <label>Annote: </label>
            <input type="text" className="form-control" value={this.state.annote} onChange={this.onChangeAnnote} />
          </div>
          <div className="form-group">
            <label>Publisher: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangePublisher}
            />
          </div>
          <div className="form-group">
            <label>Method: </label>
            <input type="text" className="form-control" value={this.state.method} onChange={this.onChangeMethod} />
          </div>
          <div className="form-group">
            <label>Participants: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.participants}
              onChange={this.onChangeParticipants}
            />
          </div>
          <div className="form-group">
            <label>Year: </label>
            <input type="text" className="form-control" value={this.state.year} onChange={this.onChangeYear} />
          </div>
          <div className="form-group">
            <label>Month: </label>
            <input type="text" className="form-control" value={this.state.month} onChange={this.onChangeMonth} />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit Article" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
