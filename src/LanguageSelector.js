import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageSelector = ({ lang, langs, setLang }) => {
  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <div>
      {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={lang}
        onChange={handleChange}
      >
        {langs.map((lang, index) => (
          <MenuItem key={index} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Language</FormHelperText>
    </div>
  );
};

export default LanguageSelector;
