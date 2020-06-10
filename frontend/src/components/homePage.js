import React, { Component } from "react";
import SearchBar from "./searchBar";

class homePageContent extends Component {
  render() {
    return (
      <div style={searchBarStyle}>
        <SearchBar />
      </div>
    );
  }
}
const searchBarStyle = {
  width: "55%",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

export default homePageContent;
