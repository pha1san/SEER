import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      selection: "title",
    };
  }

  onChangeText = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  onSelected = (e) => {
    this.setState({
      selection: e.target.value,
    });
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          value={this.state.searchText}
          onChange={this.onChangeText}
          placeholder="Search articles..."
        />
        <div className="input-group-append">
          <select
            className="btn btn-outline-secondary"
            required
            value={this.state.selection}
            onChange={this.onSelected}>
            <option key={"title"} value={"title"}>
              Title
            </option>
            <option key={"author"} value={"author"}>
              Author
            </option>
          </select>
          <Link
            className="btn btn-outline-secondary"
            type="button"
            to={{
              pathname: "/article",
              state: {
                searchText: this.state.searchText,
                searchField: this.state.selection,
              },
            }}>
            Search Articles
          </Link>
        </div>
      </div>

      // <div class="input-group md-form form-sm form-2 pl-0">
      //   <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
      //   <div class="input-group-append">
      //     <span class="input-group-text red lighten-3" id="basic-text1">
      //       <div class="dropdown-menu" aria-hidden="true">
      //         <a class="dropdown-item">Title</a>
      //         <a class="dropdown-item">Author</a>
      //       </div>
      //       <i class="fas fa-search text-grey" aria-hidden="true">
      //         Search
      //       </i>
      //     </span>
      //   </div>
      // </div>

      // <div>
      //   <form className={useStyles.root} noValidate autoComplete="off" fullWidth="true">
      //     <TextField
      //       id="outlined-basic"
      //       label="Search "
      //       variant="outlined"
      //       display="inline-block"
      //       vertical-align="middle"
      //     />
      //     <Button variant="contained" color="primary" display="inline-block" vertical-align="middle">
      //       Search
      //     </Button>
      //     <input type="submit" value="Search Articles" className="btn btn-primary" height="outlined-basic" />
      //   </form>
      // </div>

      // <div>
      //   <form onSubmit={this.onSubmit}>
      //       <div className="form-group">
      //         <TextField
      //           label="Search "
      //           className="form-control"
      //           variant="outlined"
      //           value={this.state.searchText}
      //           onChange={this.onChangeText}
      //           placeholder="Search..."
      //         />
      //       </div>
      //       <div className="form-group">
      //         <Link
      //           to={{
      //             pathname: "/article",
      //             state: {
      //               searchText: this.state.searchText,
      //             },
      //           }}>
      //           <input type="submit" value="Search Articles" className="btn btn-primary" />
      //         </Link>
      //       </div>
      //   </form>
      // </div>
    );
  }
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));
