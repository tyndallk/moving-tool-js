import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";


import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard.component";
import logo from "./logo.png"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    
    // Redirect to login
    window.location.href = "./login";
  }
}


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="codingthesmartway.com" target="_blank">
          <img src={logo} width="100" height="100" alt="codingthesmartway.com" />
        </a>
        <Link to="/" className="navbar-brand">On the Move</Link>
        <div className="navbar-collaspe">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/todo" className="nav-link">Moving Checklist</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Checklist</Link>
            </li>
            
          </ul>
        </div>
      </nav>
 
      <Route path="/" exact component={Landing} />
      <Route path="/todo" exact component={TodosList} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/delete/:id" component={DeleteTodo}/>
      <Route path="/create" component={CreateTodo} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
       <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
       </Switch>
    </div>
    </Router>
    </Provider>
  );
}


export default App;
