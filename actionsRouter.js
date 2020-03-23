const express = require("express");
const Actions = require("./data/helpers/actionModel.js");

const router = express.Router();

////////////////////////////////////////////////////////////////
// posts

//done
router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// gets

// done
router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// done
router.get("/:id", validateActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// delete

// done
router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(response => {
      res.status(200).json({ message: "Action deleted." });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// put

// done
router.put("/:id", validateActionId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

////////////////////////////////////////////////////////////////
// middleware

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ error: `Action not found.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request missing action data." });
  } else if (
    req.body.project_id === undefined ||
    req.body.description === undefined ||
    req.body.notes === undefined
  ) {
    res.status(400).json({
      error: "Request must include project_id, description, and notes fields."
    });
  } else {
    next();
  }
}

module.exports = router;
