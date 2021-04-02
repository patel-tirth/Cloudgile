import React, { useRef, useState } from 'react';
import "../css/Chat.css";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';
import { Box, Container, IconButton } from '@material-ui/core';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router';

const auth = firebase.auth();
const firestore = firebase.firestore();


export function ChatRoom(props) {
  const dummy = useRef();
  const projectID = useParams();
  const messagesRef = firestore.collection('messages');
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
  }

  return (
  <>
    <Container fluid maxWidth={false}>
      {messages && messages.map(msg => {
        return (<ChatMessage key={msg.id} message={msg} />)
      })}
      <span ref={dummy}></span>
      <Box component="div" style={{width: '', bottom: 0, position: 'absolute'}}>
        <Form style={{display: 'flex',}} onSubmit={sendMessage}>
          <Form.Group style={{ display: 'contents' }}>
            <Form.Control required onInput={e => setFormValue(e.target.value)} placeholder="Type a Message" />
              <Button variant="primary" type="submit" disabled={!formValue}><SendIcon /></Button>
          </Form.Group>
        </Form>
      </Box>
    </Container>
  </>
  )
}

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
  
export default ChatRoom;
  