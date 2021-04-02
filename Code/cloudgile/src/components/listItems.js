import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from "../auth/signOut";
import SettingsDialog from "./SettingsDialog"
import { Link } from 'react-router-dom';

export const MainListItems = ({projectID}) => {
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
      <SettingsDialog />
      <ListItem button onClick={() => signOut()} >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out"/>
      </ListItem>
    </div>
  )
}

