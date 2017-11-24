import Item from './Item'
import { ItemList } from './Lists'

export default class Recipe {
  constructor(recipeRaw, title, catalysts, id) {
    this.input = new ItemList().setItems(recipeRaw.input.items.concat(recipeRaw.input.fluids))
    this.output = new ItemList().setItems(recipeRaw.output.items.concat(recipeRaw.output.fluids))
    this.category = title
    this.catalysts = catalysts
    this.id = id
  }

  getParentRecipes(allRecipes) {
    let recipes = []

    allRecipes.forEach(recipe => {
      recipe.output.forEach(output => {
        this.input.forEach(input => {
          if (input.matches(output) && !recipes.includes(recipe))
            recipes.push(recipe)
        })
      })
    })

    return recipes
  }
}
