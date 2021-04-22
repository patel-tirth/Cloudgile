import { useState } from "react";
import { Card, Button, CardContent, Typography, } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

import "../css/SignUpForm.css";

import { signInWithGoogle } from '../auth/signInWithGoogle';
import { getCurrentUser } from "../auth";
import DividerLine from "../util/DividerLine";
import { createUser } from "../auth/createUser";

function SignUpForm() {
    const [user, setUser] = useState(getCurrentUser());
   
    auth.onAuthStateChanged((user) => setUser(user));

    const history = useHistory();

    const onSignInWithGoogleClicked = async () => {
        await signInWithGoogle();
        history.push('/dashboard');
        createUser(getCurrentUser().id)
    }
 
    return (
        <div className="auth-form-wrapper">
            <Card raised className="auth-form-card">
                <div style={{backgroundColor: "cornflowerblue", color: 'white', padding: '10px'}}>
                    <Typography gutterBottom variant="h5" component="h2" align="center" color="inherit">CLOUDGILE SIGN UP</Typography>
                </div>
                <CardContent>
                    {user ? (
                        history.push('/dashboard')
                    ) : (
                        <section>
                            <Link to="/signIn">
                            <Button
                                size="large"
                                className="auth-form-buttons"
                                variant="contained"
                                color="secondary"
                                >
                                Already have account? Login
                            </Button>
                            </Link>
                            <DividerLine />
                            <Button
                                size="large"
                                className="auth-form-buttons"
                                onClick={onSignInWithGoogleClicked}
                                variant="outlined"
                                >
                                <FcGoogle className="react-icons" />
                                Sign Up with Google
                            </Button>
                        </section>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUpForm;