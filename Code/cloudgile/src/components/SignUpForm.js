import { useState } from "react";
import { Card, Button, TextField, CardContent, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

import "../css/SignUpForm.css";

import { signInWithGoogle } from '../auth/signInWithGoogle';
import { getCurrentUser } from "../auth";
import { signUp } from "../auth/signUp";
import DividerLine from "../util/DividerLine";
import { createUser } from "../auth/createUser";
import { Redirect, } from 'react-router-dom';

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
        createUser(getCurrentUser().id)
    }

    const onSignUpWithEmailPassword = async () => {
        try {
            await signUp(loginEmail, passOne, firstName + lastName);
            history.push('/');
            createUser(getCurrentUser().id)
        } catch (e) {
            setErrorMessage(e.message);
        }
    }
 
    const onFormSubmit = e => {
        setErrorMessage(null);
        e.preventDefault()
        validateForm();
        onSignUpWithEmailPassword();
        <Redirect to='/tutorial'/>
    }

    const handleChange = e => {
        setAgreeCheck(!AgreeCheck);
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
                            <form onSubmit={onFormSubmit}>
                                <div className="auth-form-fields">
                                        <TextField
                                            required
                                            fullWidth
                                            placeholder="First Name"
                                            name="firstName"
                                            type="text"
                                            value={firstName || ""}
                                            onChange={(e) => setfirstName(e.target.value)}>
                                        </TextField>
                                </div>
                                
                                    <div className="auth-form-fields"><TextField
                                        required
                                        fullWidth
                                        placeholder="Last Name"
                                        name="lastName"
                                        type="text"
                                        value={lastName || ""}
                                        onChange={(e) => setLastName(e.target.value)}>
                                    </TextField></div>
                                

                                    <div className="auth-form-fields"><TextField
                                        required
                                        fullWidth
                                        placeholder="Email Address"
                                        name="SignUpMail"
                                        type="email"
                                        value={loginEmail || ""}
                                        onChange={(e) => setLoginEmail(e.target.value)}>
                                    </TextField></div>
                                

                                    <div className="auth-form-fields"><TextField
                                        required
                                        fullWidth
                                        placeholder="New Password"
                                        name="PassOne"
                                        type="password"
                                        value={passOne || ""}
                                        onChange={(e) => setPassOne(e.target.value)}>
                                    </TextField></div>
                                

                                    <div className="auth-form-fields"><TextField
                                        required
                                        fullWidth
                                        placeholder="Confirm Password"
                                        name="PassTwo"
                                        type="password"
                                        value={passTwo || ""}
                                        onChange={(e) => setPassTwo(e.target.value)}>
                                    </TextField></div>

                                <FormControlLabel control={
                                        <Checkbox checked={AgreeCheck}
                                            required
                                            onChange={handleChange} 
                                            name="AgreeCheck"
                                            color="primary"/>
                                            
                                        
                                }
                                label="Agree to T&C"/>

                                <Typography color="error">{ErrorMessage}</Typography>

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