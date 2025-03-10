const Recipe = require('../models/Recipe');
exports.getRecipes = async (req, res) => {
try { 
    const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) { res.status(500).json({message: err.message});
    }
};
exports.getRecipe = async (req, res) => {
try {const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message:'Recipe not found'});
        res.json(recipe);
    } catch (err) {res.status(500).json({ message: err.message });
    }
};
exports.addRecipe = async (req, res) => {
const { name, ingredients, instructions } = req.body;
try { const newRecipe = new Recipe({ name, ingredients, instructions });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateRecipe = async (req, res) => {
try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
