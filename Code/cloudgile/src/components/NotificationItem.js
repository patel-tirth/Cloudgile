import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import {removeReminders} from '../data/Reminders/removeReminders'
function NotificationItem(props) {
  const { message, divider } = props;
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);

  const remove = () => {
    removeReminders(message);
  }

  const handleError = useCallback(() => {
    setHasErrorOccurred(true);
  }, [setHasErrorOccurred]);

  return (
    <ListItem divider={divider}>
      <ListItemAvatar>
        {hasErrorOccurred ? (
          <ErrorIcon color="secondary" />
        ) : (
          <Avatar
            src={hasErrorOccurred ? null : message.src}
            onError={handleError}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={message}
      />
    <IconButton onClick={remove}>
      <ClearIcon/>
    </IconButton>
    </ListItem>
  );
}

NotificationItem.propTypes = {
  message: PropTypes.string.isRequired,
  divider: PropTypes.bool,
};

export default NotificationItem;