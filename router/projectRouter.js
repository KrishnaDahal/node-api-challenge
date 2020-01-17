const express = require('express');

const router = express.Router();

const projectData = require('../data/helpers/projectModel.js');
const actionData = require('../data/helpers/actionModel.js');


router.get('/', (req, res) => {
  projectData.get()
  .then (projects => {
    res.status(200).json(projects);
  })
  .catch (err => {
    res.status(500).json({error: "Project can not be retrieved."})
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  projectData.get(id)
  .then (projects => {
    res.status(200).json(projects);
  })
  .catch (err => {
    res.status(500).json({error: "Project can not be retrieved."})
  })
});

router.get('/:id/actions', (req, res) => {
  // do your magic!
  const id = req.params.id;

  projectData.getProjectActions(id)
  .then (posts => {
    if (posts.length >0) {
      res.status(200).json(posts);
    }
    else {
      res.status(400).json({message: "There are no actions published on this project"})
    }
  })
  .catch (err => {
    res.status(500).json({error: "Actions of this project can not be retrieved."})
  })

});

router.post('/', (req, res) => {
    const projectInfo = req.body;
  
    projectData.insert(projectInfo)
    .then ( projects => {
      res.status(200).json(projects);
    })
    .catch (err => {
      res.status(500).json({error: "project can not be added."})
    })
  });  

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  projectData.remove(id)
  .then ( projects => {
    res.status(200).json({message: `${projects} successfully removed.`});
  })
  .catch (err => {
    res.status(500).json({error: "Project can not be deleted."})
  })
});

router.put('/:id', (req, res) => {
  const id = req.params.id;

  projectData.update(id, req.body)
  .then ( projects => {
    res.status(200).json({message: `user ${projects} successfully updated.`});
  })
  .catch (err => {
    res.status(500).json({error: "Project can not be deleted."})
  })
});


function validateProjectId(req, res, next) {
  const id = req.params.id;
  ProjectData.get(id)
  .then (projects => {
    if (projects) {
      next();
    }
    else {
      res.status(500).json({message: "invalid project id"})
    }
  })
  .catch (err => {
    res.status(500).json({error: "Id of project is required"})
  })
}

function validateProject(req, res, next) {
  const projectInfo = req.body;
  const { name } = projectInfo;

  if (!projectInfo) {
    res.status(400).json({message: "missing project data"})
  }
  else if (!name) {
    res.status(400).json({message: "missing required name field"})
  }
  else {
    next();
  }
}

function validateProjectActions(req, res, next) {
  // do your magic!
  const actionInfo = req.body;
  const { project_id, description } = actionInfo;

  if (!project_id) {
    res.status(400).json({message: "missing project id data"})
  }
  else if (!description) {
    res.status(400).json({message: "missing required description field"})
  }
  else {
    next();
  }
}

module.exports = router;
