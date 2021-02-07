import { useState } from "react";
import { Card, Button, TextField, CardContent, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

import "../css/SignInForm.css";

import { signInWithGoogle } from '../auth/signInWithGoogle';
import { getCurrentUser } from "../auth";
import { signOut } from '../auth/signOut'
import { signUp } from "../auth/signUp";
import DividerLine from "../util/DividerLine";


function renderLoggedIn() {
    return (
        <div className="loggedIn-wrapper">
            <h1>Welcome to Cloudgile!</h1>
            <div>
                <Button onClick={() => signOut()}>
                    Log out
        </Button>
            </div>
        </div>
    );
}

function SignUpForm() {
    const [user, setUser] = useState(getCurrentUser());

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [passOne, setPassOne] = useState("");
    const [passTwo, setPassTwo] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [AgreeCheck, setAgreeCheck] = useState(false);

    auth.onAuthStateChanged((user) => setUser(user));

    const history = useHistory();

    const validateForm = () => {
        if (passOne !== passTwo) {
            setErrorMessage('Passwords do not match')
            return
        };
        return null;
    }

    const onSignInWithGoogleClicked = async () => {
        await signInWithGoogle();
        history.push('/');
    }

    const onSignUpWithEmailPassword = async () => {
        try {
            await signUp(loginEmail, passOne);
            history.push("/")
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    const onFormSubmit = e => {
        setErrorMessage(null);
        e.preventDefault()
        validateForm();
        onSignUpWithEmailPassword();
    }

    const handleChange = e => {
        setAgreeCheck(!AgreeCheck);
    }
 
    return (
        <div className="auth-form-wrapper">
            <Card raised>
                <CardContent>
                    {user ? (
                        renderLoggedIn()
                    ) : (
                        <section>
                            <Typography gutterBottom variant="h5" component="h2" align="center">Cloudgile Sign Up</Typography>

                            <form onSubmit={onFormSubmit}>
                                <TextField
                                    required
                                    size="normal"
                                    fullWidth
                                    placeholder="First Name"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    value={firstName || ""}
                                    onChange={(e) => setfirstName(e.target.value)}>
                                </TextField>

                                <TextField
                                    required
                                    size="normal"
                                    fullWidth
                                    placeholder="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    value={lastName || ""}
                                    onChange={(e) => setLastName(e.target.value)}>
                                </TextField>

                                <TextField
                                    required
                                    size="normal"
                                    fullWidth
                                    placeholder="Email Address"
                                    margin="normal"
                                    name="SignUpMail"
                                    type="email"
                                    value={loginEmail || ""}
                                    onChange={(e) => setLoginEmail(e.target.value)}>
                                </TextField>

                                <TextField
                                    required
                                    size="normal"
                                    fullWidth
                                    className="auth-form-fields"
                                    placeholder="New Password"
                                    margin="normal"
                                    name="PassOne"
                                    type="password"
                                    value={passOne || ""}
                                    onChange={(e) => setPassOne(e.target.value)}>
                                </TextField>

                                <TextField
                                    required
                                    size="normal"
                                    fullWidth
                                    className="auth-form-fields"
                                    placeholder="Confirm Password"
                                    margin="normal"
                                    name="PassTwo"
                                    type="password"
                                    value={passTwo || ""}
                                    onChange={(e) => setPassTwo(e.target.value)}>
                                </TextField>

                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel control={
                                            <Checkbox checked={AgreeCheck}
                                                required
                                                onChange={handleChange} 
                                                name="AgreeCheck"/>
                                                
                                            
                                    }
                                    label="Agree to T&C"/>
                                    {ErrorMessage ? <Typography color="error">{ErrorMessage}</Typography> : null}
                                </div>

                                <Button
                                    type="submit"
                                    size="large"
                                    className="auth-form-buttons"
                                    variant="contained"
                                    color="primary"
                                    >
                                    Create Account
                                </Button>
                            </form>
                            <DividerLine />
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