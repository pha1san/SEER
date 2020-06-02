import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ArticleList from "./components/articlesList";
import Article from "./components/article.js";
import CreateUser from "./components/createUser";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SearchBar} />
        <Route path="/article" exact component={ArticleList} />
        <Route path="/article/id:id" component={Article} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
