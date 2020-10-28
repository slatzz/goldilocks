import React from 'react';
import {
  makeStyles, Typography,
  AppBar, Toolbar, Button,
} from '@material-ui/core';

import {
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

import Landing from '../landing/Landing';
import Search from '../search/Search';
import Dashboard from '../dashboard/Dashboard';
import Messages from '../messages/Messages';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Navbar: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h3" color="inherit">
              🛏
            </Typography>
            <Button component={Link} to="/" color="inherit">HOME</Button>
            <Button component={Link} to="/search" color="inherit">SEARCH</Button>
            <Button component={Link} to="/dashboard" color="inherit">DASHBOARD</Button>
            <Button component={Link} to="/messages" color="inherit">MESSAGES</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          {/* <Route exact path="/register" component={Landing} /> */}
          <Route exact path="/search" component={Search} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/messages" component={Messages} />
        </Switch>
      </div>
    </Router>
  );
};

export default Navbar;
