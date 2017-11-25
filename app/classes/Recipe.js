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
    return allRecipes.filter(recipe => {
      let result = false
      recipe.output.forEach(output => {
        this.input.forEach(input => {
          result = (input.matches(output) && !recipes.includes(recipe))
        })
      })
      return result
    })
  }
}
