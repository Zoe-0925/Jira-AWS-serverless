import { hot } from 'react-hot-loader/root';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
/**     Router    */
import { Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
/**    Pages     */
import ProjectTable from "./Pages/ProjectTable"
import Board from "./Pages/Board"
import ProjectDetail from "./Pages/ProjectDetail"
import './assets/stylesheets/main.scss';
import history from "./history"
import Text from "./Pages/Text"

const App = () => {

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/projects" exact component={ProjectTable} />
          <Route path="/projects/roadmap" component={App} />
          <Route path="/projects/board" exact component={Board} />
          <Route path="/projects/settings/details" exact component={ProjectDetail} />
        </Switch>
      </Router>
    </div>
  )
}

export default process.env.NODE_ENV === "development" ? hot(App) : App

