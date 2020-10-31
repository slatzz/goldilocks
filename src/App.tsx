import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// Components
import SignUp from './components/landing/auth/Signup';
import Login from './components/landing/auth/Login';
import Landing from './components/landing/Landing';
import Search from './components/search/Search';
import Dashboard from './components/dashboard/Dashboard';
import Messages from './components/messages/Messages';
import Navbar from './components/global/Navbar';

const App: React.FC = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route
            exact
            path="/"
            component={Landing}
          />
          <Route
            exact
            path="/login"
            render={() => (!isAuthenticated ? (
              <Login />) : (
                <Redirect to="/dashboard" />
            ))}
          />
          <Route
            exact
            path="/register"
            render={() => (!isAuthenticated ? (
              <SignUp />) : (
                <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (isAuthenticated ? (
              <Dashboard />) : (
                <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/search"
            component={Search}
          />
          <Route
            exact
            path="/messages"
            component={Messages}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
