import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import { Container } from "@material-ui/core";
// import { Button } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
import Navbar from "./components/navbar";
import ArticleList from "./components/articlesList";
import Article from "./components/article.js";
import CreateUser from "./components/createUser";
import SearchBar from "./components/searchBar";
import SubmitArticle from "./components/submitArticle";
import Test from "./components/test";
//import HomePageContent from "./components/homePageContent";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path={["/", "/article"]} exact component={SearchBar} />
        <Route path="/article" exact component={ArticleList} />
        <Route path="/article/id:id" component={Article} />
        <Route path="/user" exact component={CreateUser} />
        <Route path="/article/submit" component={SubmitArticle} />

        <Route path="/test" exact component={Test} />
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
