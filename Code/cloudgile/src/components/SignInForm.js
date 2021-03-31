import { useState } from "react";
import { Card, Button, TextField, CardContent, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

import "../css/SignInForm.css";

import { signInWithGoogle } from '../auth/signInWithGoogle';
import { getCurrentUser } from "../auth";
import { signIn } from "../auth/signIn";
import DividerLine from "../util/DividerLine";
import { createUser } from "../auth/createUser";

function SignInForm() {
  const [user, setUser] = useState(getCurrentUser());

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState(null);

  auth.onAuthStateChanged((user) => setUser(user));

  const history = useHistory();

  const onSignInWithGoogleClicked = async () => {
    await signInWithGoogle();
    history.push('/dashboard');
    createUser(getCurrentUser().id)
  }

  const onSignInWithEmailPassword = async () => {
    try {
      await signIn(loginEmail, loginPassword);
      history.push("/dashboard")
    } catch (e) {
      setErrorMessage(e.message);
    }
    createUser(getCurrentUser().id)
  }

  const onFormSubmit = e => {
    setErrorMessage(null);
    e.preventDefault()
    onSignInWithEmailPassword();
  }

  return (
    <div className="auth-form-wrapper">
      <Card raised>
        <div style={{ backgroundColor: "cornflowerblue", color: 'white', padding: '10px' }}>
          <Typography gutterBottom variant="h5" component="h2" align="center" color="inherit">CLOUDGILE SIGN IN</Typography>
        </div>
        <CardContent>
          {user ? (
            history.push('/dashboard')
          ) : (
            <section>
                <form onSubmit={onFormSubmit}>
                  <TextField
                    required
                    size="medium"
                    fullWidth 
                    placeholder="Email Address"
                    margin="dense"
                    name="loginEmail"
                    type="email"
                    value={loginEmail || ""}
                    onChange={(e) => setLoginEmail(e.target.value)}>
                  </TextField>

                  <TextField
                    required
                    size="medium"
                    fullWidth 
                    className="auth-form-fields" 
                    placeholder="Password"
                    margin="dense"
                    name="loginPassword"
                    type="password"
                    value={loginPassword || ""}
                    onChange={(e) => setLoginPassword(e.target.value)}>
                  </TextField>

                  <div style={{display: 'flex'}}>
                    {ErrorMessage ? <Typography color="error">{ErrorMessage}</Typography> : null}
                    <Button color="secondary" style={{marginLeft: "auto"}}>Forgot Password? Reset!</Button>
                  </div>

                  <Button
                    type="submit"
                    size="large"
                    className="auth-form-buttons"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                  </form>
                  <DividerLine />
                  <Link to="/createAccount">
                  <Button
                    size="large"
                    className="auth-form-buttons"
                    variant="contained"
                    color="secondary"
                  >
                    Create New Account
                  </Button>
                </Link>
                  <DividerLine/>
                  <Button
                    size="large"
                    className="auth-form-buttons" 
                    onClick={onSignInWithGoogleClicked}
                    variant="outlined"
                    >
                    <FcGoogle className="react-icons" />
                      Sign In with Google
                  </Button>
                </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInForm;