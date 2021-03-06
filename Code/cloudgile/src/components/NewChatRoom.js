import React, { useEffect, useState } from 'react';
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
import { ChatRoom } from './ChatRoom';
import { Redirect, useParams } from 'react-router';
import { getProject } from '../data/Projects';
import { getCurrentUser } from '../auth';
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
        height: '100vh',
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

export default function NewChatRoom() {
    const classes = useStyles();
    const [open, setOpen] = useState(false); 
    const [project, setProject] = useState(null)
    const { projectID } = useParams();
    
    const loadData = async () => {
        let data = await getProject(getCurrentUser().id, projectID)
        setProject(data)
    }

    const checkAllow = () => {
        if (project && project.users.includes(getCurrentUser().id)) {
            <Redirect to="/dashboard"/>
        }
    }

    useEffect(() => {
        loadData()
        checkAllow()
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            { project === false ? <Redirect to="/dashboard"/> :
            <div className={classes.root}>
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
                    <NotificationToggle />
                    <IconButton>
                        {/* <PersonIcon style={{ color: grey[50] }} /> */}
                        <UserIconToggle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}
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
                    <MainListItems />
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}><ChatRoom projectID={projectID}/></main>
        </div>}    
        </>
    );
}