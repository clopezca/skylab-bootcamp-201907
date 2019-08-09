function RecipeDetails({ meal: { idMeal, strMeal, strInstructions, strYoutube, strMealThumb, favorite }, ingredients, onBack, onToggle }) {
    return <div className='wrapper'>
        <h3>{strMeal}</h3> 
        <FavButton active={favorite} onToggle={() => onToggle(idMeal)} />
        <img className='img'src={strMealThumb}/>
        <ul>
            {ingredients.map((ingredient, index) => {
                
                return <li className='ingredients' key={index}>
                    {<span>{ingredient.ingredientName}: {ingredient.measure}</span>}
                </li>

            })}
        </ul>
        <p className='descText'>{strInstructions}</p>
        <a className='btnGo' href={strYoutube} target="_blank" >VIDEO</a>

        <a className='backButton' href="#" onClick={ event => {
            event.preventDefault()
            onBack()
        }} >Go Back</a>
    </div>
}