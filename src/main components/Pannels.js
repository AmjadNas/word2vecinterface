import React from 'react';
import UploadFile from './UploadFile';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputForm from './InputForm';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};
const Pannels = ({
  value,
  modelName,
  setOpenDialog,
  setIsLoading,
  setPercentCompleted,
  setStatus,
  setTitle,
}) => {
  return (
    <>
      <TabPanel value={value} index={0}>
        <UploadFile
          modelName={modelName}
          setOpenDialog={setOpenDialog}
          setIsLoading={setIsLoading}
          setPercentCompleted={setPercentCompleted}
          setStatus={setStatus}
          setTitle={setTitle}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InputForm
          modelName={modelName}
          setOpenDialog={setOpenDialog}
          setIsLoading={setIsLoading}
          setPercentCompleted={setPercentCompleted}
          setStatus={setStatus}
          setTitle={setTitle}
        />
      </TabPanel>
    </>
  );
  //   return <UploadFile />;
};

export default Pannels;
