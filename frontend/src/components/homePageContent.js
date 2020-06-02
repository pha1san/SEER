import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = (useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
})));

function HomePageContent() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography variant="h6">
          SEER: Software Engineering Evidence Repository
        </Typography>
      </div>

      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Search the SEER Database
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <FindInPageIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FindInPageIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </main>
  );
}

export default HomePageContent;
