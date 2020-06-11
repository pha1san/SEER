import React, { Component } from "react";
import SearchBar from "./searchBar";
import { CardMedia } from '@material-ui/core'; 

class homePageContent extends Component {
  render() {
    return (
      /*<div style = {imgStyle}>
        <CardMedia
      className={classes.imgStyle}
      image="./public/SEERhomepageimg"
      title="SEER Homepage"
        />
      </div>
      */

      <div style={searchBarStyle}>
        <SearchBar />
      </div>
    );
  }
}

const imgStyle = {
  height: "0",
  paddingTop: "56.25",
  marginTop: "30"
}

const searchBarStyle = {
  width: "55%",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

export default homePageContent;
