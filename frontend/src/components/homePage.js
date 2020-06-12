import React, { Component } from "react";
import SearchBar from "./searchBar";
import { CardMedia } from '@material-ui/core'; 

class homePageContent extends Component {
  render() {
    return (
      <div>
        <div style={imgStyle}>
          <img src={ require("./SEERhomeimage2.jpg")} alt="SEERhomepage" width="75%" position="absolute" left="50%" top="50%"></img>
        </div>
        <div style={searchBarStyle}>
          <SearchBar />
        </div>  
      </div>
    );
  }
}

const imgStyle = {
  width: "55%",
  position: "absolute",
  left: "56%",
  top: "40%",
  transform: "translate(-50%, -50%)",
}


const searchBarStyle = {
  width: "55%",
  position: "absolute",
  left: "51%",
  top: "70%",
  transform: "translate(-50%, -50%)",
};


export default homePageContent;
