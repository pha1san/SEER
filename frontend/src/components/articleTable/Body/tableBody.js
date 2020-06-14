import React from "react";
import { Link } from "react-router-dom";

import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core/";

import StarRatings from "react-star-ratings";

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

export default function EnhancedTableBody(props) {
  const { articles, order, orderBy, page, rowsPerPage, isSelected, handleClick, dense, role } = props;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, articles.length - page * rowsPerPage);

  return (
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
              {role === "admin" && (
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} inputProps={{ "aria-labelledby": labelId }} />
                </TableCell>
              )}
              {role === "moderator" && <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>}
              {role === "analyst" && <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>}

              <TableCell
                component="th"
                scope="row"
                padding="default"
                width="50%"
                onClick={(event) => handleClick(event, article._id)}>
                <Link
                  to={{
                    pathname: "/article/id" + article._id,
                    state: {
                      role: role,
                    },
                  }}>
                  {article.title}
                </Link>
              </TableCell>
              <TableCell align="left" width="30%">
                {article.author}
              </TableCell>
              <TableCell align="left" width="10%">
                {article.year}
              </TableCell>
              <TableCell align="left" width="5%">
                <StarRatings
                  rating={Math.random() * 5 + 0.5}
                  starDimension="13px"
                  starSpacing="0px"
                  numberOfStars={5}
                  starRatedColor="orange"
                />
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 23 : 43) * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

EnhancedTableBody.propTypes = {};
