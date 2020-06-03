import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
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
//--------------------------------------------------------------------------------------------------------------------------------
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//--------------------------------------------------------------------------------------------------------------------------------
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onClickDelete } = props;

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Articles
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => onClickDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

//--------------------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleDelete = (event) => {
    console.log(selected);
    console.log(articles.length);

    setArticles(
      articles.filter((article) => {
        let check = true;
        setSelected(
          selected.filter((id) => {
            if (article._id === id) {
              check = false;
              axios
                .delete("/entries/delete/id" + id)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
              return true;
            } else {
              return false;
            }
          })
        );
        return check;
      })
    );

    console.log(articles.length);

    // //   selected.filter((article) => {
    // //     console.log(article);
    // //     return true; //article._id !== id;
    // //   })
    // // );

    // selected.map((id) => {
    //   axios
    //     .delete("/entries/delete/id" + id)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
    // // setSelected([]);setArticles(...articles.filter((article) => article._id !== id));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = articles.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickDetail = (event, id) => {
    history.push("/article/id" + id);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, articles.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} onClickDelete={handleDelete} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={articles.length}
            />
            <TableBody>
              {stableSort(articles, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((article, index) => {
                  const isItemSelected = isSelected(article._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, article._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={article._id}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="default"
                        onClick={(event) => handleClick(event, article._id)}>
                        {article.title}
                      </TableCell>
                      <TableCell align="right" onClick={(event) => handleClickDetail(event, article._id)}>
                        {article.author}
                      </TableCell>
                      <TableCell align="right" onClick={(event) => handleClickDetail(event, article._id)}>
                        {article.year}
                      </TableCell>
                      <TableCell align="right">
                        <StarRatingComponent name="rate1" starCount={5} value={100} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
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
