import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    main: {
        display: 'flex',
        flex: 1
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Main = ({children}) => {

    const classes = useStyles();

    return (
        <main className={classes.main}>
            <Container maxWidth="md" className={classes.mainContainer}>
                {children}
            </Container>
        </main>
    )
}

export default Main;
