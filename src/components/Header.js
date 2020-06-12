import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import Service from '../Service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Header = ({ value, handleChange }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClck = (e) => {
    Service.logOut();
    history.replace('/login');
  };

  return (
    <div className={classes.root} color="default">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Word2Vec Utility
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={handleClck}
          >
            Log Out
          </Button>
        </Toolbar>

        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Train Model" {...a11yProps(0)} />
          <Tab label="Compare Words" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default Header;
