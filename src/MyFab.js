import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    display: 'block',
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const MyFab = ({ onClick }) => {
  const clazz = useStyles();
  return (
    <Fab
      className={clazz.fab}
      color="primary"
      aria-label="edit"
      onClick={onClick}
      variant="extended"
    >
      <EditIcon className={clazz.extendedIcon} />
      pick Model
    </Fab>
  );
};

export default MyFab;
