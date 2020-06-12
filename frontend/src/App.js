import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import { Container } from "@material-ui/core";
// import { Button } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
import Navbar from "./components/navbar";
import ArticleList from "./components/articleTable/articlesTable";
import Article from "./components/article.js";
import CreateUser from "./components/createUser";
import SearchBar from "./components/searchBar";
import SubmitArticle from "./components/submitArticle";
import HomePage from "./components/homePage";
import UserLogin from "./components/userLogin";
import Register from "./components/register";
import Test from "./components/test";
import Test2 from "./components/test2";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={HomePage} />
        <Route path="/article/role=searcher" exact component={SearchBar} />
        <Route path="/article/role=:role" component={ArticleList} />
        <Route path="/article/id:id" component={Article} />

        <Route path="/user" exact component={CreateUser} />
        <Route path="/article/submit" component={SubmitArticle} />
        <Route path="/login" exact component={UserLogin} />
        <Route path="/register" exact component={Register} />
        <Route path="/test" exact component={Test} />
        <Route path="/test2" exact component={Test2} />
      </div>
    </Router>
  );
}

/*
export default function App() {
  return (
    <div className="Seer">
      <h1>Seer: Software Engineering Evidence Repository</h1>
      <h2>Welcome to SEER!</h2>
    </div>
  );
}
*/

export default App;
