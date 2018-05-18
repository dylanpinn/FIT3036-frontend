// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  }
};

type Props = {
  classes: Object
};

const Header = ({ classes }: Props) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          FIT3036 - Computer Science Project
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Header);
