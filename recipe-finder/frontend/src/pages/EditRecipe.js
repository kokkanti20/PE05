import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: ''
    });

    useEffect(() => {
        axios.get(`https://solid-palm-tree-wrg5r5wjjpp925v9v-5000.app.github.dev/recipes/${id}`)
            .then(res => {
                setRecipe({
                    name: res.data.name,
                    ingredients: res.data.ingredients.join(', '),
                    instructions: res.data.instructions
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/recipes/${id}`, {
            name: recipe.name,
            ingredients: recipe.ingredients.split(',').map(ing => ing.trim()),
            instructions: recipe.instructions
        }).then(() => navigate(`/recipes/${id}`))
          .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>Recipe Name:</label>
                <input
                    type="text"
                    value={recipe.name}
                    onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                    required
                />

                <label>Ingredients (comma separated):</label>
                <input
                    type="text"
                    value={recipe.ingredients}
                    onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
                    required
                />

                <label>Instructions:</label>
                <textarea
                    value={recipe.instructions}
                    onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
                    required
                ></textarea>

                <button type="submit">Update Recipe</button>
            </form>
            <br />
            <button onClick={() => navigate(`/recipes/${id}`)}>Cancel</button>
        </div>
    );
}

export default EditRecipe;
