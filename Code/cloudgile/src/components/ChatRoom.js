import React, { useRef, useState } from 'react';
// import './App.css';

import "../css/Chat.css";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignInForm from './SignInForm';

const firebaseConfig = {
  apiKey: "AIzaSyBL2AUZRy6mi_m95GT4kV7L4fsT7Axg-Zo",
  authDomain: "cloudgile.firebaseapp.com",
  databaseURL: "https://cloudgile-default-rtdb.firebaseio.com",
  projectId: "cloudgile",
  storageBucket: "cloudgile.appspot.com",
  messagingSenderId: "629892471859",
  appId: "1:629892471859:web:d409435c7a4054de925746",
};

const auth = firebase.auth();
const firestore = firebase.firestore();


export function Chat() {

    const [user] = useAuthState(auth);
  
    return (
      <div className="Chat">  
        <header></header>
        <section>
          {user ? <ChatRoom /> : <SignInForm />}
        </section>
  
      </div>
    );
  }

   function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
  
      </main>
  
      <form className="form-style" onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>⬆</button>
  
      </form>
    </>)
  }
  
  
  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }
  
  
  export default Chat;
  