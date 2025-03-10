const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', addRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
