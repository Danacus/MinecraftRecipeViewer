import { List } from 'extendable-immutable'
import { fromJS } from 'immutable'
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
        return this.filter(item => 
            item.stacks.map(stack => 
                stack.name
            ).includes(name)).size > 0
    }
      
    hasItemWithOredict(name) {
        return this.filter(item => 
            [].concat.apply([], 
                item.stacks.map(stack => 
                    stack.oreDict
                )
            ).includes(name)).size > 0
    }
}