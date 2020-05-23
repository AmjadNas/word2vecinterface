import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import Axios from 'axios';
import { api_link } from './api_link';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose }) => {
  const [models, setModels] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    Axios.get(`${api_link}models`)
      .then((res) => {
        setModels(res.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);
  const setvalue = (e) => {
    handleClose(e, e.target.innerText);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Models
          </Typography>
        </Toolbar>
      </AppBar>
      <List onClick={setvalue}>
        {models.map((model) => (
          <div key={model}>
            <ListItem button>
              <Icon />
              <ListItemText primary={model} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Dialog>
  );
};

export default FullScreenDialog;
