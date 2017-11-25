import { List } from 'extendable-immutable'
import { fromJS } from 'immutable'
import Immutable from 'immutable'
import Recipe from './Recipe'
import Item from './Item'

export class RecipeList extends List {
  setRecipes(obj) {
    return this.merge(new RecipeList(obj.recipes.map((recipe, index) => 
      new Recipe(recipe, obj.title, obj.catalysts, index)
    )))
  }

  getRecipesWithOutputName(name) {
    return this.filter(recipe => recipe.output.hasItemWithName(name))
  }
      
  getRecipesWithOutputOredict(name) {
    return this.filter(recipe => recipe.output.hasItemWithOredict(name))
  }
}

export class ItemList extends List {
  setItems(items) {
    return new ItemList(items.map(item => new Item(item)))
  }

  hasItemWithName(name) {
    return this.some(item => 
      item.stacks.some(stack => stack.name == name)
    )
  }
      
  hasItemWithOredict(name) {
    return this.some(item => 
      item.stacks.some(stack => 
        stack.oreDict.some(oreDict => oreDict == name)
      )
    )
  }

  removeBlacklisted(blacklist) {
    return this.filter(item => !item.isBlacklisted(blacklist))
  }

  noDuplicates() {
    let newArr = new ItemList()
    let stackArr = []
  
    this.forEach(item => {
      item.stacks.forEach(stack => {
        if (!newArr.includes(item) && !stackArr.includes(stack.name)) {
          newArr = newArr.push(item)
          stackArr.push(stack.name)
        }
      })
    })
  
    return newArr
  }
}

export class NodeList extends List {
  getNodeById(id) {
    return this.find(node => node.node.id == id)
  }
  
  getNodesWithRecipe(recipe) {
    return this.filter(node => node.recipe == recipe)
  }
  
  getNodesWithStack(stack) {
    return this.filter(node => node.stack.name == stack.name)
  }
  
  getNodesWithStackOredict(stack) {
    return this.filter(node => 
      node.stack.oreDict.some(oredict => stack.oreDict.includes(oredict)) || node.stack.name == stack.name
    )
  }
  
  getBlacklisted(blacklist) {
    return this.filter(node => node.isBlacklisted(blacklist))
  }
}