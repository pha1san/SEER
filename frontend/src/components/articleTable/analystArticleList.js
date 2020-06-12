import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableContainer, TablePagination, Paper, FormControlLabel, Switch } from "@material-ui/core/";

import TableBody from "./Body/tableBody";
import TableHeader from "./Header/tableHeader.js";
import TableToolbar from "./Header/tableToolbar.js";
import TableYearSlider from "./Header/tableYearSlider.js";

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
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let [filterArticles, setFilterArticles] = useState([]);

  const fetchData = useCallback(() => {
    let searchText = props.location.state !== undefined ? props.location.state.searchText : "";
    let searchField = props.location.state !== undefined ? props.location.state.searchField : "title";

    axios
      .post("/analyst/search/" + searchField, { text: searchText })
      .then((response) => {
        setArticles(response.data);
        setFilterArticles(response.data);
        console.log(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.location.state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /*
  const handleDelete = () => {
    console.log("Delete num :" + selected.length);
    for (let id of selected) {
      axios
        .delete("/entries/delete/id" + id)
        .then((response) => {
          console.log(response);
          let newArticles = articles.filter((article) => article._id !== response.data._id);
          setFilterArticles(newArticles);
          setArticles(newArticles);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setSelected([]);
  };
  */

  const handleChangeYearRange = (range) => {
    setArticles(
      filterArticles.filter((articles) => {
        if (range[1] >= 2020 && range[0] <= 1980) {
          return true;
        } else if (range[1] >= articles.year && range[0] <= articles.year) {
          return true;
        } else {
          return false;
        }
      })
    );
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableYearSlider onChangeYearRange={handleChangeYearRange} />
      </Paper>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} onClickDelete={handleDelete} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table">
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={articles.length}
            />
            <TableBody
              articles={articles}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              isSelected={isSelected}
              handleClick={handleClick}
              dense={dense}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
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
