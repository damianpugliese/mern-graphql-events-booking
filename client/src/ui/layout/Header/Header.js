import React, { useState, useContext } from 'react';
import './hamburgers.css';
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import AuthContext from '../../../context/AuthContext';

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
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    links: {
        textDecoration: 'none',
        color: '#000',
        paddingLeft: '25px',
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    navBarResponsive: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            top: 55,
            paddingTop: 24,
            paddingLeft: 16,
            flexDirection: 'column',
            position: 'fixed',
            width: '100%',
            height: 'calc(100vh - 55px)',
            justifyContent: 'flex-start',
            background: '#fff',
            right: '-100%',
            zIndex: 3,
            transition: 'all 500ms ease-in-out',
        }
    },
    isOpen: {
        extend: 'navBarResponsive',
        right: 0,
        zIndex: 4
    },
    hamburguer: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
        }
    },
    linksResponsive: {
        textDecoration: 'none',
        color: '#000',
        padding: '10px 0',
        fontSize: '1.3em',
        fontWeight: 'bold'
    }
}));

const Header = () => {

    const classes = useStyles();

    const authContext = useContext(AuthContext);

    const [isVisible, setIsVisible] = useState(false);

    const toggleNavResponsive = () => {
        setIsVisible(!isVisible);
        document.body.classList.toggle('scroll');
    }

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
                    {!authContext.token &&
                        <>
                            <Link to="/login" className={classes.links}>Login</Link>
                            <Link to="/signup" className={classes.links}>Signup</Link>
                        </>
                    }
                    <Link to="/events" className={classes.links}>Events</Link>
                    {authContext.token &&
                        <>
                            <Link to="/bookings" className={classes.links}>Bookings</Link>
                            <Link to="/" className={classes.links} onClick={authContext.logout}>Logout</Link>
                        </>
                    }
                </nav>
                <nav className={`${classes.navBarResponsive} ${isVisible ? classes.isOpen : ''}`}>
                    <Link to="/login" className={classes.linksResponsive} onClick={toggleNavResponsive}>Login</Link>
                    <Link to="/signup" className={classes.linksResponsive} onClick={toggleNavResponsive}>Signup</Link>
                    <Link to="/events" className={classes.linksResponsive} onClick={toggleNavResponsive}>Events</Link>
                    <Link to="/bookings" className={classes.linksResponsive} onClick={toggleNavResponsive}>Bookings</Link>
                </nav>
                <button className={`${classes.hamburguer} hamburger hamburger--squeeze ${!isVisible ? "" : "is-active"}`} type="button" onClick={toggleNavResponsive}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </Container>
        </header>
    )
}

export default Header;