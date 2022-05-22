import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { useStyles } from '../../../style/style.js'

const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Container maxWidth='sm'>
                <Typography align='center'>Cafesoft © {new Date().getFullYear()}</Typography>
            </Container>
        </footer>
    )
}

export default Footer
