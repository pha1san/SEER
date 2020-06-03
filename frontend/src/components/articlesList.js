import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core/";

import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import StarRatingComponent from "react-star-rating-component";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "author", numeric: true, disablePadding: false, label: "Author" },
  { id: "year", numeric: true, disablePadding: false, label: "Year" },
  { id: "rating", numeric: true, disablePadding: false, label: "Rating" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "20px 0px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const history = useHistory();

  const fetchData = useCallback(() => {
    let searchText = props.location.state !== undefined ? props.location.state.searchText : "";
    let searchField = props.location.state !== undefined ? props.location.state.searchField : "title";

    axios
      .post("/entries/search/" + searchField, { text: searchText })
      .then((response) => {
        setArticles(response.data);
        console.log(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.location.state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleClick = (event, id) => {
    history.push("/article/id" + id);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, articles.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(articles, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article) => {
                  return (
                    <TableRow hover tabIndex={-1} key={article._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="default"
                        onClick={(event) => handleClick(event, article._id)}>
                        {article.title}
                      </TableCell>
                      <TableCell align="right" onClick={(event) => handleClick(event, article._id)}>
                        {article.author}
                      </TableCell>
                      <TableCell align="right" onClick={(event) => handleClick(event, article._id)}>
                        {article.year}
                      </TableCell>
                      <TableCell align="right">
                        <StarRatingComponent name="rate1" starCount={5} value={100} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={articles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

// const Article = (props) => (
//   <tr>
//     <td>{props.article.title}</td>
//     <td>{props.article.author}</td>
//     <td>
//       <Link to={"/article/id" + props.article._id}>link</Link>
//     </td>
//   </tr>
// );

// export default class ArticleList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//     };
//   }

//   componentDidMount = () => {
//     let searchText =
//       this.props.location.state !== undefined
//         ? this.props.location.state.searchText
//         : "";

//     axios
//       .post("/entries", { text: searchText })
//       .then((response) => {
//         this.setState({ articles: response.data });
//         console.log(response.data.length);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   articleList() {
//     return this.state.articles.map((currentArticle) => {
//       return <Article article={currentArticle} key={currentArticle._id} />;
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h3>Articles</h3>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Link</th>
//             </tr>
//           </thead>
//           <tbody>{this.articleList()}</tbody>
//         </table>
//       </div>
//     );
//   }
// }
