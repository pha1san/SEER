import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableContainer, TablePagination, Paper, FormControlLabel, Switch } from "@material-ui/core/";

import TableBody from "./tableBody";
import TableHeader from "../Header/tableHeader.js";

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

  const [copyArticles, setCopyArticles] = useState([]);

  const history = useHistory();

  const fetchData = useCallback(() => {
    let searchText = props.location.state !== undefined ? props.location.state.searchText : "";
    let searchField = props.location.state !== undefined ? props.location.state.searchField : "title";

    axios
      .post("/entries/search/" + searchField, { text: searchText })
      .then((response) => {
        setArticles(response.data);
        setCopyArticles(response.data);
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
    // setArticles(
    //   articles.filter((article) => {
    //     let check = true;
    // setSelected(
    //   selected.filter((id) => {
    //     // if (article._id === id) {
    //     //   check = false;
    //       axios
    //         .delete("/entries/delete/id" + id)
    //         .then((response) => {
    //           console.log(response);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    // );
    //return check;
    //})
    //);

    selected.forEach((id) => {
      axios
        .delete("/entries/delete/id" + id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    window.location.reload(false);
    console.log(articles.length);
  };

  const handleChangeYearRange = (range) => {
    setArticles(
      copyArticles.filter((articles) => {
        if (range[1] >= 2020 && range[0] <= 1980) {
          return true;
        } else if (range[1] >= articles.year && range[0] <= articles.year) {
          return true;
        } else {
          return false;
        }
      })
    );
    console.log("real" + articles.length);
    console.log("copy" + copyArticles.length);
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
        <RangeSlider onChangeYearRange={handleChangeYearRange} />
      </Paper>
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
            <TableBody
              articles={articles}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              isSelected={isSelected}
              handleClick={handleClick}
              handleClickDetail={handleClickDetail}
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
