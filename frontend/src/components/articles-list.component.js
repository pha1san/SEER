import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Article = props => (
  <tr>
    <td>{props.article.title}</td>
    <td>{props.article.author}</td>
    <td>
      <Link to={"/edit/" + props.article._id}>link</Link>
    </td>
  </tr>
)

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/entries/')
      .then(response => {
        this.setState({ articles: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  articleList() {
    return this.state.articles.map(currentArticle => {
      return <Article article={currentArticle} key={currentArticle._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Articles</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.articleList()}
          </tbody>
        </table>
      </div>
    )
  }
}