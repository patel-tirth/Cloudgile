import React, { Fragment, useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { grey } from '@material-ui/core/colors';
import {
  Popover,
  IconButton,
  AppBar,
  List,
  Divider,
  Typography,
  Box,
  withStyles,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getReminders } from "../data/Reminders/getReminders";
import { getCurrentUser } from "../auth";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationItem from "./NotificationItem";
import firebase from 'firebase/app'
import { useCollection, useCollectionData, useDocument, useDocumentData } from "react-firebase-hooks/firestore";

const styles = (theme) => ({
  tabContainer: {
    overflowY: "auto",
    maxHeight: 350,
  },
  popoverPaper: {
    width: "100%",
    maxWidth: 350,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 270,
    },
  },
  divider: {
    marginTop: -2,
  },
  noShadow: {
    boxShadow: "none !important",
  },
});

function NotificationToggle(props) {
  const { classes } = props;
  const [messages, setMessages] = useState([])
  const anchorEl = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const userRef = firebase.firestore().collection('users').doc(getCurrentUser().id);
  const [userData] = useDocumentData(userRef)

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleClickAway = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (typeof userData !== "undefined") {
      userData.reminders && setMessages(userData.reminders)
    }
  }, [userData])


  const id = isOpen ? "scroll-playground" : null;
  return (
    messages && <Fragment>
      <IconButton
        onClick={handleClick}
        buttonRef={anchorEl}
        aria-label="Open Messages"
        aria-describedby={id}
        style={{marginLeft: 'auto'}}>
        <Badge badgeContent={messages.length} color="secondary">
          <NotificationsIcon style={{ color: grey[50] }}/>
        </Badge>
      </IconButton>
      
      <Popover
        disableScrollLock
        id={id}
        open={isOpen}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.popoverPaper }}
        onClose={handleClickAway}
      >
        <AppBar position="static" color="inherit" className={classes.noShadow}>
          <Box pt={1} pl={2} pb={1} pr={1}>
            <Typography variant="subtitle1" align="center">MESSAGES</Typography>
          </Box>
          <Divider className={classes.divider} />
        </AppBar>
        <List dense className={classes.tabContainer}>
            {/* uncomment below when an array of messages is passed as props. 
            If array is not passed, then the app will crash because messages.length will be meaningless. 
             */}
          {messages.length === 0 ? (
            <ListItem>
              <ListItemText>
                You haven&apos;t received any messages yet.
              </ListItemText>
            </ListItem>
          ) : (
            messages.map((element, index) => (
              <NotificationItem
                key={index}
                message={element}
                divider={index !== messages.length - 1}
              />
            ))
          )}
          {/* {(messages === null || messages.length === 0) ? null:null} */}
        </List>
      </Popover>
    </Fragment>
  );
}

NotificationToggle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NotificationToggle);