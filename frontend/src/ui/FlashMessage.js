import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { SessionContext } from '../auth/AuthProvider';

const FlashMessage = () => {
  const { message, clearMessage } = useContext(SessionContext);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={message}
      variant={'error'}
      onClose={clearMessage}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={clearMessage}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default FlashMessage;
