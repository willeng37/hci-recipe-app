import React from 'react'
import data from '../data.json'
import '../RecipeResults.css'
import { Link } from "react-router-dom"
import { database } from '../firebase';
import { set, push, update, ref } from "firebase/database";
import { useAuth } from '../contexts/AuthContext';

function DisplayRecipeSummary({recipeSteps, recipeIndex, currentIngredients, user}){
    // let theIngredients = DisplayRecipeIngredients({recipeIndex, addedIngredients, changeAddedIngredients})
    var displayIngreds = []
    let theIngredients = extractRecipeIngredients({currentIngredients})
    let theSteps = extractRecipeSteps({recipeSteps})
    //here is where the code to pass idx back and forth goes
    return(
        <div>
            {TitleSum()}
            {theIngredients}
            {theSteps}
            {ConfirmRecipe()}
        </div>
    )

    function updateRecipe(recipeIndex, recipeSteps) {
        // for (var i = 0; i < data.results[0].recipes[recipeIndex].sections[0].components.length; i++) {
            update(ref(database,'users/' + user.uid + '/recipe-book'),{
                [data.results[0].recipes[recipeIndex].name]:  {
                    recipethumbnail: data.results[0].recipes[recipeIndex].thumbnail_url,
                    index: recipeIndex,
                    recipe_obj: {
                        steps: recipeSteps,
                            // steps: data.results[0].recipes[recipeIndex].instructions,
                        ingredients: displayIngreds
                    }

                }
            })
        // }
    }

    //add firebase data confirmation to here
    function ConfirmRecipe(){
        // console.log(displayIngreds)
        return(
            <div class = "row justify-content-center">
                <button type="button" class = "confirm-but">
                   <Link to="/hci-recipe-app/RecipeBook"  onClick={() => updateRecipe(recipeIndex, recipeSteps)}>Add New Recipe</Link>
               </button>
            </div>
        )
    }

    function TitleSum(){
        return(
            <div class = 'row'>
                <div class = "title-sum">
                    Summary
                </div>
            </div>
        )
    }

    function TitleIn(){
        return(
            <div class = 'row'>
                <div class = "title">
                    Ingredients
                </div>
            </div>
        )
    }

    function TitleSteps(){
        return(
            <div class = 'row'>
                <div class = "title">
                    Steps
                </div>
            </div>
        )
    }

    // INGREDIENT PORTION
    function extractRecipeIngredients({currentIngredients}){
        // console.log(currentIngredients)
        let amtIngredients = currentIngredients.length // this line gives errors about lenght!
        const returnValue = [];
        returnValue.push(<TitleIn/>);
        for(let i = 0; i< amtIngredients; i++){
            displayIngreds.push(currentIngredients[i].raw_text)
            returnValue.push(<GenerateRecipeIngredients idx={i} currentIngredients={currentIngredients}/>)
        }

        return (
            returnValue
        )
    }

    function GenerateRecipeIngredients({idx, num}){

        let displayText = currentIngredients[idx].raw_text
        // console.log(displayText)
        // displayIngreds.push(displayText)
        // console.log(displayIngreds)
        return (
            <div class="row justify-content-center">
                <div class="ingredient">
                    {displayText}
                </div>
            </div>
        )
    }

    // STEPS PORTION
    function extractRecipeSteps({recipeSteps}){
        // let steps_data = data.results[0].recipes[recipeIndex].instructions;
        let steps_data = recipeSteps
        let amtSteps = steps_data.length
        // console.log(steps_data)
        const returnValue = [];
        returnValue.push(<TitleSteps/>)
        for(let i = 0; i< amtSteps; i++){
            returnValue.push(<GenerateRecipeSteps num={i} recipeSteps={recipeSteps}/>)
        }
        return(
            returnValue
        )
    }

    function GenerateRecipeSteps({num, recipeSteps}){
        // let step = data.results[0].recipes[recipeIndex].instructions[num].display_text
        let step = recipeSteps[num]
        let punctuation = ". "
        return(
            <div class = "row justify-content-center">
                <div class = "steps">
                    {num}
                    {punctuation}
                    {step}
                </div>
            </div>
        )
    }
}

export default DisplayRecipeSummary