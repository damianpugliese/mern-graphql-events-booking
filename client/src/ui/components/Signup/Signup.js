import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 35,
        maxWidth: 450
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    button: {
        margin: theme.spacing(3, 0, 2)
    },
    linkContainer: {
        marginTop: 10
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap'
    }
}));

const Signup = () => {

    const classes = useStyles();

    const signupFormDataInitialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    }

    const [signupFormData, setSignupFormData] = useState(signupFormDataInitialState);

    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();

    const validateForm = errors => {

        let valid = true;

        Object.values(errors).forEach(
            value => value.length > 0 && (valid = false)
        );

        return valid;

    }

    const resetForm = () => {
        setSignupFormData(signupFormDataInitialState);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        const { errors } = signupFormData;

        switch (name) {
            case 'username':
                errors.username =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
            case 'email':
                errors.email =
                    !(/\S+@\S+\.\S+/.test(value))
                        ? "Enter a valid email"
                        : '';
                break;
            case 'password':
                errors.password =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value !== signupFormData.password
                        ? 'Passwords do not match'
                        : '';
                break;
            default:
                break;
        }

        setSignupFormData({
            ...signupFormData,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        let { username, email, password, confirmPassword } = signupFormData;

        let { errors } = signupFormData;

        if (username.length === 0) {
            errors.username = 'Required field';
            usernameInput.current.focus();
        } else if (email.length === 0) {
            errors.email = 'Required field';
            emailInput.current.focus();
        } else if (password.length === 0) {
            errors.password = 'Required field';
            passwordInput.current.focus();
        } else if (password && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            confirmPasswordInput.current.focus();
        }

        setSignupFormData(prevState => ({
            ...prevState,
            errors
        }));

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: { username: "${username}", email: "${email}", password: "${password}", confirmPassword: "${confirmPassword}" }) {
                        _id
                        email
                    }
                }
            `
        }

        if (validateForm(errors)) {
            axios.post('/graphql', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            resetForm();
        }

    }

    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.loginTitle}>
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={handleChange}
                        value={signupFormData.username}
                        error={signupFormData.errors.username.length > 0}
                        helperText={signupFormData.errors.username}
                        inputRef={usernameInput}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={signupFormData.email}
                        error={signupFormData.errors.email.length > 0}
                        helperText={signupFormData.errors.email}
                        inputRef={emailInput}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={signupFormData.password}
                        error={signupFormData.errors.password.length > 0}
                        helperText={signupFormData.errors.password}
                        inputRef={passwordInput}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={signupFormData.confirmPassword}
                        error={signupFormData.errors.confirmPassword.length > 0}
                        helperText={signupFormData.errors.confirmPassword}
                        inputRef={confirmPasswordInput}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Signup
                    </Button>
                    <Grid container>
                        <Grid item className={classes.linkContainer}>
                            <Link to="/login" variant="body2" className={classes.link}>
                                Do you have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}

export default Signup;