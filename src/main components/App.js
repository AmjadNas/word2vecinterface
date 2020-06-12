import React, { useState } from 'react';
import Header from '../components/Header';
import Pannels from '../main components/Pannels';
import FullScreenDialog from '../components/FullScreenDialog';
import MyFab from '../components/MyFab';
import ProgressDialog from '../components/ProgressDialog';

const App = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');

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
        setTitle={setTitle}
      />
      <MyFab onClick={handleClickOpen} />
      <FullScreenDialog open={open} handleClose={handleClose} />
      <ProgressDialog
        handleClose={() => setOpenDialog(false)}
        progress={percentCompleted}
        open={openDialog}
        loading={isLoading}
        status={status}
        title={title}
      />
    </>
  );
};

export default App;
