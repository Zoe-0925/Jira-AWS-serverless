import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
/**     Router    */
import { Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
/**    Pages     */
import ProjectList from "./Pages/ProjectList"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Board from "./Pages/Board"
import ProjectDetail from "./Pages/ProjectDetail"
import './App.scss';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import history from "./history"
import Test from "./Pages/Test"

Amplify.configure(aws_exports);

const App = () => {

  return (
    <div className="App">
      <AmplifySignOut />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/projects" exact component={ProjectList} />
          <Route path="/projects/create" exact component={App} />
          <Route path="/projects/roadmap" component={App} />
          <Route path="/projects/board" exact component={Board} />
          <Route path="/projects/settings/details" exact component={ProjectDetail} />
        </Switch>
      </Router>
    </div>
  );
}
//export default process.env.NODE_ENV === "development" ? hot(App) : App

export default process.env.NODE_ENV === "development" ? hot(withAuthenticator(App)) : withAuthenticator(App)
