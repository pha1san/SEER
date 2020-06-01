import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ArticleList from "./components/articlesList";
import Artile from "./components/article";
import CreateUser from "./components/createUser";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={SearchBar} />
        <Route path="/article" component={ArticleList} />
        <Route path="/entries/id:id" component={Artile} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
