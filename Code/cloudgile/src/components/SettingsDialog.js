import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
  Palette as PaletteIcon,
  Link as LinkIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";

import {
  Dialog,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@material-ui/core";

// function TabPanel(props)
// {
//   const classes = useStyles();
//   const {children, value, index} = props;

//   return <Box>
//     {
//       value === index && index === 2 && (
//       <List>
//       <ListItem button
//       >
//         <ListItemText primary="Gmail" />
//       </ListItem>
//       <Divider />
//       <ListItem button>
//         <ListItemText primary="Github" />
//       </ListItem>
//       <ListItem button>
//         <ListItemText primary="Facebook" />
//       </ListItem>
//       </List>
//       )
//     }
//     {
//       value === index && index === 0 && (
//         <div className={classes.root}>
//             <Avatar alt="Cindy Baker" src="https://techcrunch.com/wp-content/uploads/2018/07/logo-2.png?w=300" className={classes.large} />
//         </div>
        
//       )
//     }
//   </Box>
// }

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  tab:{
    marginTop: 70,
    flexGrow: 2,
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }


  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
      <Paper className={classes.tab}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Account" icon={<AccountCircleIcon/>}>
        
        </Tab>
        <Tab label="Appearance" icon={<PaletteIcon/>}/>
        <Tab label="Links" icon={<LinkIcon/>}/>
        <Tab label="Security" icon={<SecurityIcon/>}/>
      </Tabs>
          <Box>
          {value === 2 && (
              <List className={classes.root}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <EmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Gmail" secondary="email" />
                      <IconButton aria-label="link"
                      onClick={openMenu}>
                        <LinkIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <LastPageIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Github" secondary="username/profile link" />
                      <IconButton aria-label="link"
                      onClick={openMenu}>
                        <LinkIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <DeleteForeverIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Linkedin" secondary="profile link" />
                      <IconButton aria-label="link"
                      onClick={openMenu}>
                        <LinkIcon />
                      </IconButton>
                  </ListItem>
                  </List>
            
            )}
          {value === 0 && (
              <Box>
                  <List className={classes.root}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Avatar"/>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonOutlineIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="First Name" secondary="first name" />
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonOutlineIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Last Name" secondary="last name" />
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                  <List className={classes.root}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <EmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Email" secondary="email" />
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <LastPageIcon/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Signed in " secondary="Last signed in: date, time" />
                    </ListItem>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <DeleteForeverIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Delete Account" secondary="This action cannot be undone" />
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                  </ListItem>
                  </List>
              </Box>
            )}
          {value === 3 &&(
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <LockIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Change Password" secondary="Last changed: date" />
                <IconButton aria-label="password-update">
                  <EditIcon />
                </IconButton>
            </ListItem>
            )}
          {value === 1 && (
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ColorLensIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Change Theme" secondary/>
                <IconButton aria-label="cange-theme">
                  <EditIcon />
                </IconButton>
            </ListItem>
            )}
          <Menu
            id="link-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            >
              <MenuItem marginLeft="20" onClick={handleCloseMenu}>Link Acccount</MenuItem>
              <MenuItem marginLeft="20" onClick={handleCloseMenu}>Unlink Account</MenuItem>
            </Menu>
        </Box>
    </Paper>
  </Dialog>
    </div>
  );
}
