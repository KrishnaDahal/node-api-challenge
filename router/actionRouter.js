const express = require('express');

const router = express.Router();

const projectData = require('../data/helpers/projectModel.js');
const actionData = require('../data/helpers/actionModel.js');


router.get('/', (req, res) => {
  actionData.get()
  .then (actions => {
    res.status(200).json(actions);
  })
  .catch (err => {
    res.status(500).json({error: "Actions can not be retrieved."})
  })
});

router.get('/:id', validateActionId, (req, res) => {
  const id = req.params.id;

  actionData.get(id)
  .then (actions => {
    res.status(200).json(actions);
  })
  .catch (err => {
    res.status(500).json({error: "Actions can not be retrieved."})
  })
});


router.delete('/:id', validateActionId, (req, res) => {
  const id = req.params.id;

  actionData.remove(id)
  .then ( actions => {
    res.status(200).json({message: `${actions} successfully removed.`});
  })
  .catch (err => {
    res.status(500).json({error: "actions can not be deleted."})
  })
});

router.put('/:id', validateActionId, (req, res) => {
  const id = req.params.id;

  actionData.update(id, req.body)
  .then ( actions => {
    res.status(200).json({message: `Project ${actions} successfully updated.`});
  })
  .catch (err => {
    res.status(500).json({error: "Action can not be deleted."})
  })
});


function validateActionId(req, res, next) {
  const id = req.params.id;
  actionData.get(id)
  .then (actions => {
    if (actions) {
      next();
    }
    else {
      res.status(500).json({message: "invalid action id"})
    }
  })
  .catch (err => {
    res.status(500).json({error: "Id of action is required"})
  })
}


module.exports = router;
