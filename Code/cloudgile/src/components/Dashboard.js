

// function renderLoggedIn() {
//     return (
//         <div className="loggedIn-wrapper">
//             <div>
//                 <Button onClick={() => signOut()} color="yellow">
//                     Log out
//         </Button>
//             </div>
//         </div>
//     );
// }

// function Dashboard() {
//     const [user, setUser] = useState(getCurrentUser());
//     auth.onAuthStateChanged((user) => setUser(user));

//     return (
//         <div>{user ? renderLoggedIn() : null}</div>
        
//     )    
// }

import React from 'react';
import { getCurrentUser } from "../auth";
import { useState } from "react";

import { signOut } from "../auth/signOut";
import { Button } from "semantic-ui-react";
import { auth } from "../firebase";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
// import Deposits from './Deposits';
// import Orders from './Orders';
import Title from './Title';

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
    marginLeft: 'auto',
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
    height: '100vh',
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

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
  
          <Typography  color="inherit" noWrap className={classes.title}>
           Welcome {getCurrentUser().email}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarHeading}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            DASHBOARD MENU
          </Typography>
          <div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            <Grid item  xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                
             
                <Title>Product Backlog</Title>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
                <Title>Timeline</Title>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              {/* <Paper className={classes.paper}> */}
                {/* <Orders /> */}
                <Title>Search Engine</Title>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={4}>
            
            <Grid item  xs={12} md={4} lg={4} >
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                <Title>Chat</Title>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
                <Title>Code/Project</Title>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              {/* <Paper className={classes.paper}> */}
                {/* <Orders /> */}
                <Title>Reminder</Title>
              </Paper>
            </Grid>
          </Grid>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}

// export default Dashboard;
