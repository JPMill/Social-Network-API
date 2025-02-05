const express = require('express');
const { getThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

const router = express.Router();

router.get('/', getThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

module.exports = router;