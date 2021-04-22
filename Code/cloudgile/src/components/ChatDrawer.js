import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Tooltip } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "../css/Chat.css";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import SendIcon from '@material-ui/icons/Send';
import { Box, Container } from '@material-ui/core';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import Divider from '@material-ui/core/Divider';
const auth = firebase.auth();
const firestore = firebase.firestore();



const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      fontSize: 22,
      paddingLeft: 90,
      color: '#3f51b5',
    },
    list: {
        width: 350,
      },
      fullList: {
        width: 'auto',
      },
  }));

function ChatMessage(props) {
    const { text, uid, photoURL, createdAt } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="avatar"/>
        <p className="textMessage">{text}</p>
        <p className="timeStamp">{createdAt.toString()}</p>
      </div>
    </>)
  }

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {projectID} = useParams();
  const dummy = useRef();
  const messagesRef = firestore.collection('rooms').doc(projectID).collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.Timestamp.now().toDate().toLocaleString(),
      uid,
      photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
      <Box>
        <div className={classes.root}>{"Project Chat"}</div>
        <Divider />
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            >
            <Container fluid maxWidth={false}>
            {messages && messages.map(msg => {
                return (<ChatMessage key={msg.id} message={msg} />)
            })}
            <span ref={dummy}></span>
            <Box component="div" style={{width:330, right: 10, bottom: 10, position: 'absolute'}}>
            <Form style={{display: 'flex',}} onSubmit={sendMessage}>
                <Form.Group style={{ display: 'contents' }}>
                    <Form.Control required onInput={e => setFormValue(e.target.value)} placeholder="Type a Message" />
                    <Button variant="primary" type="submit" disabled={!formValue}><SendIcon /></Button>
                </Form.Group>
                </Form>
            </Box>
            </Container>
        </div>
      </Box>
    
  );

  return (
    <div>
        <Tooltip disableHoverListener disableFocusListener placement="left">
        <Fab onClick={toggleDrawer('right', true)} color="secondary" style={{ position: 'absolute', bottom: 160, right: 20 }}>
            <ChatIcon>{'right'}</ChatIcon>
            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
            </Drawer>
        </Fab>
        </Tooltip>
    </div>
  );
}
