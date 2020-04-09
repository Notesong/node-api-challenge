import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home.js";
import { Project } from "./components/Project.js";

import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects`)
      .then(e => {
        setProjects(e.data);
      })
      .catch(err => {
        console.log("Error fetching data", err);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h3>Projects</h3>
        <ul>
          {projects.map(project => {
            return (
              <li key={project.id}>
                <Link to={`/${project.id}`}>{project.name}</Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Project} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
