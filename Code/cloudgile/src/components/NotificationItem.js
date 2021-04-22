import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

function NotificationItem(props) {
  const { message, divider } = props;
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);

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
    </ListItem>
  );
}

NotificationItem.propTypes = {
  message: PropTypes.object.isRequired,
  divider: PropTypes.bool,
};

export default NotificationItem;