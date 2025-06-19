// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST create new project
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = new Project({ title, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;