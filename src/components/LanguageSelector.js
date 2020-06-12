import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

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
