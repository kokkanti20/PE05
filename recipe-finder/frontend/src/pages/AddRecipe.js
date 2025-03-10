import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AddRecipe() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            name,
            ingredients: ingredients.split(',').map(ing => ing.trim()), // Convert comma-separated string to array
            instructions
        };
        axios.post('https://solid-palm-tree-wrg5r5wjjpp925v9v-5000.app.github.dev/recipes', newRecipe)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };
    return (
    <div>
        <h1>Add New Recipe</h1>
        <form onSubmit={handleSubmit}>
        <label>Recipe Name:</label>
        <input
                type="text"
                value={name}
                    onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Ingredients (comma separated):</label>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                />
                <label>Instructions:</label>
                <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Add Recipe</button>
            </form>
            <br />
            <button onClick={() => navigate('/')}>Back to Recipe List</button>
        </div>
    );
}
export default AddRecipe;
