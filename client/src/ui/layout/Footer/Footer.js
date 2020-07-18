import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    footerContainer: {
        padding: 0, 
        height: 50
    },
    footerText: {
        textAlign: 'center', 
        color: 'rgba(var(--f52,142,142,142),1)'
    }
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <footer>
            <Container className={classes.footerContainer} maxWidth="md">
                <Typography className={classes.footerText} variant="body2">&copy;2020 Damián Pugliese</Typography>
            </Container>
        </footer>
    )
}

export default Footer;