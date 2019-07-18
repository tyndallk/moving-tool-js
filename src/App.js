import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store";


import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from "./components/delete-todo.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";


import logo from "./logo.png"

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
              <Link to="/" className="nav-link">Moving Checklist</Link>
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
    </div>
    </Router>
    </Provider>
  );
}

export default App;
