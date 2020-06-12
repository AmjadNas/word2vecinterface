import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';
import Service from '../Service';

const LogInDialog = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const handleClose = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', e.target.user.value);
    data.append('password', e.target.password.value);
    try {
      if (await Service.login(data)) {
        setOpen(false);
        history.replace('/');
      }
    } catch (e) {}
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <form onSubmit={handleClose}>
        <DialogContent>
          <DialogContentText>Please enter you credintials.</DialogContentText>

          <TextField
            autoFocus
            name="user"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LogInDialog;
