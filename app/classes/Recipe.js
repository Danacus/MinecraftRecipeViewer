import Item from './item'

export default class Recipe {
  constructor(recipeRaw, categoryInfo, id) {
    this.input = recipeRaw.input.items.map(item => new Item(item))
    this.input = this.input.concat(recipeRaw.input.fluids.map(fluid => new Item(fluid)))
    this.output = recipeRaw.output.items.map(item => new Item(item))
    this.output = this.output.concat(recipeRaw.output.fluids.map(fluid => new Item(fluid)))
    this.category = categoryInfo.title
    this.catalysts = categoryInfo.catalysts
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
