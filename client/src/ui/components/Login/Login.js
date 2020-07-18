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

const Login = () => {

    const classes = useStyles();

    const loginFormDataInitialState = {
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        },
    }

    const [loginFormData, setLoginFormData] = useState(loginFormDataInitialState);

    const emailInput = useRef();
    const passwordInput = useRef();

    const validateForm = errors => {

        let valid = true;

        Object.values(errors).forEach(
            value => value.length > 0 && (valid = false)
        );

        return valid;

    }

    const resetForm  = () => {
        setLoginFormData(loginFormDataInitialState);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        const { errors } = loginFormData;

        switch (name) {
            case 'email':
                errors.email =
                    !(/\S+@\S+\.\S+/.test(value)) && value.length > 3
                        ? "Enter a valid email"
                        : '';
                break;
            case 'password':
                errors.password =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
            default:
                break;
        }

        setLoginFormData({
            ...loginFormData,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        let { email, password } = loginFormData;

        let { errors } = loginFormData;

        if (email.length === 0) {
            errors.email = 'Required field';
            emailInput.current.focus();
        } else if (password.length === 0) {
            errors.password = 'Required field';
            passwordInput.current.focus();
        } 

        setLoginFormData(prevState => ({
            ...prevState,
            errors
        }));

        const requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
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
                .then(res=>console.log(res.data))
                .catch(err=>console.log(err));
            resetForm();
        }

    }

    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.loginTitle}>
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        onChange={handleChange}
                        value={loginFormData.email}
                        error={loginFormData.errors.email.length > 0}
                        helperText={loginFormData.errors.email}
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
                        value={loginFormData.password}
                        error={loginFormData.errors.password.length > 0}
                        helperText={loginFormData.errors.password}
                        inputRef={passwordInput}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item className={classes.linkContainer}>
                            <Link to="/signup" variant="body2" className={classes.link}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}

export default Login;