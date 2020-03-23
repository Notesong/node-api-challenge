const express = require("express");
const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();

////////////////////////////////////////////////////////////////
// posts

// done
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// gets

// done
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//done
router.get("/:id", validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.get("/:id", validateProjectId, (req, res) => {
//   Users.getById(req.params.id)
//     .then(user => {
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

////////////////////////////////////////////////////////////////
// delete

// done
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(response => {
      res.status(200).json({ message: "Project deleted." });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// put

// done
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// middleware

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: `Project not found.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request missing project data." });
  } else if (
    req.body.name === undefined ||
    req.body.description === undefined
  ) {
    res
      .status(400)
      .json({ error: "Request must include name and description fields." });
  } else {
    next();
  }
}

module.exports = router;
