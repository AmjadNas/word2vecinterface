import React, { useState } from 'react';
import Header from './Header';
import Pannels from './Pannels';
import MySnackBar from './MySnackBar';
import Button from '@material-ui/core/Button';
import FullScreenDialog from './FullScreenDialog';
import MyFab from './MyFab';
import ProgressDialog from './ProgressDialog';

const App = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [status, setStatus] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, text) => {
    if (text) {
      setModel(text);
    }

    setOpen(false);
  };

  const handleChangeIndex = (e, index) => {
    setValue(index);
  };
  return (
    <>
      <Header value={value} handleChange={handleChangeIndex} />
      <Pannels
        value={value}
        modelName={model}
        setOpenDialog={setOpenDialog}
        setIsLoading={setIsLoading}
        setPercentCompleted={setPercentCompleted}
        setStatus={setStatus}
      />
      <MyFab onClick={handleClickOpen} />
      <FullScreenDialog open={open} handleClose={handleClose} />
      <ProgressDialog
        handleClose={() => setOpenDialog(false)}
        progress={percentCompleted}
        open={openDialog}
        loading={isLoading}
        status={status}
        title="dialog"
      />
    </>
  );
};

export default App;
