import React, { useState } from 'react';
import { getCurrentUser } from "../auth";
import CollapsibleTable from './projectList';
import NewProject from './CreateNewProject';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationToggle from './NotificationToggle';
import { MainListItems } from './listItems';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useEffect } from 'react';
import { getAllProjects } from '../data/Projects';
import { Tutorial } from './Tutorial';
import { Fab, Tooltip } from '@material-ui/core';
import { getUserForProject } from '../auth/getUserFromId';
import { BoxLoading } from 'react-loadingg';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { getReminders } from '../data/Reminders/getReminders';

import UserIconToggle from './UserIconToggle';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarTitle: {
    marginRight: 'auto',
    textTransform: 'uppercase',
    ...theme.mixins.toolbarHeading
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100vh',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([])
  const [firstTime, setFirstTime] = useState(false)
  const current = getCurrentUser().id
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const result = await getAllProjects(current);
    const firstUser = await getUserForProject([current])
    const messages = await getReminders(getCurrentUser().id)
    setRows(result)
    setFirstTime(firstUser[current].firstUser)
    setLoading(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const refreshProjects = () => {
    setLoading(true)
    setTimeout(() => {
      loadData()
    }, 1000);
  }

  return (    
    <div className={classes.root}>

      {firstTime && <Tutorial/>}
     
      <Tooltip arrow title="Refresh" placement="left">
        <Fab color="secondary" style={{ position: 'absolute', bottom: 90, right: 20 }} onClick={() => refreshProjects()}>
          <RefreshIcon />
        </Fab>
      </Tooltip>

      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
      
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            DASHBOARD
          </Typography>
          <div>
          </div>
          <NotificationToggle messages={messages}/>
          <IconButton>
            <UserIconToggle/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarHeading}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            MENU
          </Typography>
          <div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <List>
          <MainListItems/>
        </List>
        <Divider />

      </Drawer>
      {loading ? <BoxLoading/> : <main className={classes.content}>
        <section className="d-inline-flex w-100" style={{ padding: '15px', paddingTop: '25px'}}>
          <Typography variant="h4" color="secondary" noWrap align="left" style={{textTransform: 'uppercase', fontWeight: '500' }}>
            <AccountTreeIcon style={{ margin: '0 10 2 0', fontSize: '30px' }} />Your Projects
          </Typography>
          <div style={{marginLeft: 'auto'}}></div>
        </section>
        <CollapsibleTable rows={rows}/>
       
        <NewProject loadData={() => loadData()} />
      </main>}
    </div>
  );
}