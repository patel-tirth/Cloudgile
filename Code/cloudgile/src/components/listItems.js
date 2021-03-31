import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from "../auth/signOut";
import ChatIcon from '@material-ui/icons/Chat';
import SettingsDialog from "./SettingsDialog"
import { Link } from 'react-router-dom';

export const MainListItems = (props) => {
  return (
    <div>
      <Link to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to="/Chat">
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat"/>
        </ListItem>
      </Link>
      <SettingsDialog />
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" onClick={() => signOut()} />
      </ListItem>
    </div>
  )
}

