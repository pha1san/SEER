import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";

import Slider from "@material-ui/core/Slider";

const useSliderStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export default function RangeSlider(props) {
  const classes = useSliderStyles();
  const [value, setValue] = React.useState([1980, 2020]);
  const { onChangeYearRange } = props;

  function valuetext(value) {
    return value;
  }

  const minYear = {
    value: 1980,
    label: "1980",
  };

  const maxYear = {
    value: 2020,
    label: "2020",
  };

  const marks = [minYear, maxYear];

  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = () => {
    onChangeYearRange(value);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Year range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        marks={marks}
        max={maxYear.value}
        min={minYear.value}
      />
    </div>
  );
}
