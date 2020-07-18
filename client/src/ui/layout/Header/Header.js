import React from 'react';
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        width: '100%',
        height: '55px',
        background: '#fff',
        boxShadow: '0px 0.5px 1px 0px rgba(0,0,0,0.2)'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    linkBrand: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#000',
    },
    logo: {
        width: 30,
        marginRight: 10
    },
    brandText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    navBar: {
        display: 'inline-flex',
    },
    links: {
        textDecoration: 'none',
        color: '#000',
        paddingLeft: '25px',
        fontSize: '1.2em',
    }
}));

const Header = () => {

    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Container maxWidth="md" className={classes.container}>
                <Link to="/" className={classes.linkBrand}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography className={classes.brandText}>
                        Events Booking
                    </Typography>
                </Link>
                <nav className={classes.navBar}>
                    <Link to="/login" className={classes.links}>Login</Link>
                    <Link to="/signup" className={classes.links}>Signup</Link>
                    <Link to="/events" className={classes.links}>Events</Link>
                    <Link to="/bookings" className={classes.links}>Bookings</Link>
                </nav>
            </Container>
        </header>
    )
}

export default Header;