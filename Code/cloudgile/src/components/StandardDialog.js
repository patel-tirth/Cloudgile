import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";
import {
    Dialog,
    IconButton,
} from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(1),
    },
    tab:{
      marginTop: 70,
      flexGrow: 2,
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(0),
      },
      
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));

export default function FormDialog(props) {
  const state = {
      profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }
  const imageHandler = (e) => {
    // code to upload image in the firebase goes here.
  };
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <ListItem button className={classes.root}>
            <ListItemAvatar>
            <Avatar>
                {
                    (props.whatIcon === 1) && (props.whatValue === 0) && (
                        <AccountCircleIcon/>
                    ) || (props.whatIcon === 2 || props.whatIcon === 3) && (
                        <PersonOutlineIcon />
                    ) || (props.whatIcon === 4) && (
                        <EmailIcon />
                    ) || (props.whatIcon === 5) && (
                        <LastPageIcon/>
                    ) || (props.whatIcon === 6) && (
                        <DeleteForeverIcon/>
                    ) || (props.whatIcon == 1) && (props.whatValue == 2) && (
                        <PersonOutlineIcon />
                    )
                }
                
                
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary= {props.value}/>
            {
                (props.whatIcon === 2 || props.whatIcon === 3 || props.whatIcon === 4 || props.whatIcon === 5)
                && (props.whatValue === 0)
                && (
                    <ListItemText secondary= {props.value}/>
                )
            }
            
            
            {
                (props.whatIcon === 2 || props.whatIcon === 3 || props.whatIcon === 1) 
                && (props.whatValue === 0)
                && (
                <IconButton>
                    <EditIcon onClick={handleClickOpen}></EditIcon>
                </IconButton>
                ) || (props.whatIcon === 6) && (
                    <IconButton>
                        <DeleteIcon onClick={handleClickOpen}></DeleteIcon>
                    </IconButton>
                )
                
            }  

            {
                (props.whatValue === 2) && (
                    <IconButton>
                    <EditIcon onClick={handleClickOpen}></EditIcon>
                    </IconButton>
                )
            }
        </ListItem>
      
      {
          (props.whatIcon === 2 || props.whatIcon === 3)
          && (props.whatValue === 0) 
          && (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.value}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    SAVE
                </Button>
                </DialogActions>
            </Dialog>
          ) 
          || (props.whatIcon === 6) 
          && (props.whatValue === 0)
          && (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.value}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to delete the account permanently. This action can not be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                DELETE
            </Button>
            </DialogActions>
        </Dialog> 
          )
        ||
        (props.whatIcon === 1) && (props.whatValue === 2) && (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.value}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Old password: 
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="password"
                    fullWidth
                />
            <DialogContentText>
                New password: 
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="password"
                    fullWidth
                />
            <DialogContentText>
                Reenter new password: 
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                UPDATE
            </Button>
            </DialogActions>
        </Dialog> 
        ) 
        ||
        (props.whatIcon === 1)
        && (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.value}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                DELETE
            </Button>
            <Button onClick={handleClose} color="primary">
                SAVE
            </Button>
            </DialogActions>
            </Dialog> 
          )
      } 
      
    </div>
  );
}