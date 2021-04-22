import React, {useEffect } from 'react';

import Backlog from './Backlog';
import Timeline from './Timeline';
import { useState } from "react";

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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect, useParams } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems } from './ProjectDashboardListItems';
import Title from './Title';
import '../App.css';
import { getProject } from '../data/Projects/getProject';
import { getCurrentUser } from '../auth';
import NotificationToggle from './NotificationToggle';
import NewIssue from './CreateNewIssue';
import { Tooltip } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { getUserForProject } from '../auth/getUserFromId';
import ViewListIcon from '@material-ui/icons/ViewList';
import TimelineIcon from '@material-ui/icons/Timeline';
import ProjectDetails from './ProjectDetails';
import { BoxLoading } from 'react-loadingg';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import ChatDrawer from './ChatDrawer'
import UserIconToggle from './UserIconToggle';
import { Sprint } from './Sprint';
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
    height: 'auto',
  },
}));

export default function CloudgileProject() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(null)
  const {projectID} = useParams()
  const [users, setUsers] = useState(null)  
  const [loading, setLoading] = useState(true)
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const loadData = async () => {
    const data = await getProject(getCurrentUser().id, projectID)
    setProject(data)
    setUsers(null)
    setLoading(false)
  }

  const loadUsers = async () => {
    // console.log(project.users)
    let data = await getUserForProject(project.users)
    setUsers(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (project){
      loadUsers()
    }
  }, [project])

  const refreshProjects = async () => {
    setLoading(true)
    await setTimeout(async () => {
      await loadData()
    }, 1000);
  }

  return (
    <>
      {project === false ? <Redirect to="/dashboard" /> :
        project && users ? 
          <div className={classes.root}>
            <ChatDrawer/>
            <Tooltip arrow title="Refresh" placement="left">
              <Fab color="secondary" style={{ position: 'absolute', bottom: 90, right: 20 }} onClick={() => refreshProjects()}>
                <RefreshIcon />
              </Fab>
            </Tooltip>
            <NewIssue refresh={refreshProjects}/>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
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

                <Typography component="h1" align="center" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                  {project.name}
                </Typography>
                <div>
                </div>
                <NotificationToggle/>
                <IconButton>
                  {/* <PersonIcon style={{ color: grey[50] }} /> */}
                  <UserIconToggle/>
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
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  DASHBOARD MENU
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
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                          <Title align="left"><ViewListIcon style={{ margin: '0 10 2 0' }} />Product Backlog</Title>
                          <Backlog project={project} users={users} refresh={refreshProjects} />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                          <Title align="left"><TimelineIcon style={{ margin: '0 10 2 0' }} />Timeline</Title>
                          <Timeline project={project} users={users} refresh={refreshProjects} />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper>
                      <ProjectDetails project={project} users={users} refresh={refreshProjects} />
                    </Paper>
                    <Paper className={fixedHeightPaper} style={{marginTop: '20px'}}>
                      <Title align="left"><DirectionsRunIcon style={{ margin: '0 5 2 2' }} />Sprint</Title>
                      <Sprint project={project} refresh={refreshProjects} />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </main>}
          </div>
        : null
      }
    </>
  );
}