import React, { useEffect, useState } from "react";
import axios from "axios";

export const Project = props => {
  const id = props.match.params.id;
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const getActions = async () => {
      await axios
        .get(`http://localhost:4000/api/projects/${id}/actions/`)
        .then(e => {
          setActions(e.data);
        })
        .catch(err => {
          console.log("Error fetching data", err);
        });
    };
    getActions();
  }, []);

  return (
    <>
      <h4>Actions</h4>
      <ul>
        {actions.map(action => {
          return <li key={action.id}>{action.description}</li>;
        })}
      </ul>
    </>
  );
};
