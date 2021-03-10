import { hot } from 'react-hot-loader/root';
import { Auth } from 'aws-amplify';
import React from 'react';
/**     Router    */
import { Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
/**    Pages     */
import ProjectTable from "./pages/projectTable"
import Board from "./pages/board"
import ProjectDetail from "./pages/projectDetail"
import './assets/stylesheets/main.scss';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import history from "./history"

Amplify.configure(aws_exports);

const App = () => {

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/projects" exact component={ProjectTable} />
          <Route path="/projects/roadmap" component={App} />
          <Route path="/projects/board" exact component={Board} />
          <Route path="/projects/settings/details" exact component={ProjectDetail} /> </Switch>
      </Router>
    </div>
  )
}

export default process.env.NODE_ENV === "development" ? hot(App) : App

//export default process.env.NODE_ENV === "development" ? hot(withAuthenticator(App)) : withAuthenticator(App)
