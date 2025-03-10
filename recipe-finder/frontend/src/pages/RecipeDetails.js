import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://solid-palm-tree-wrg5r5wjjpp925v9v-5000.app.github.dev/recipes/${id}`)
            .then(res => setRecipe(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://solid-palm-tree-wrg5r5wjjpp925v9v-5000.app.github.dev/recipes/${id}`)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    if (!recipe) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>{recipe.name}</h1>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
            <button onClick={handleDelete}>Delete Recipe</button>
            <Link to={`/edit/${id}`}>Edit Recipe</Link>
            <br />
            <Link to="/">Back to Recipe List</Link>
        </div>
    );
}

export default RecipeDetails;
