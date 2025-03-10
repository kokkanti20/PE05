import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('https://solid-palm-tree-wrg5r5wjjpp925v9v-5000.app.github.dev/recipes')
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Recipe List</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/add">Add Recipe</Link>
        </div>
    );
}

export default RecipeList;
