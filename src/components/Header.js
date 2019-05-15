import React from 'react';

import {withStyles, AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Link} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

function Header(props) {
    const { title, classes, button } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {title}
                    </Typography>
                    <Button color="inherit" component={Link} to={button.link}>
                        {button.label}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);
