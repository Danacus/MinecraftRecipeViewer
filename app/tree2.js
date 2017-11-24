import { store } from './index'
import { fromJS, toJS } from 'immutable'

export default class Tree {
    constructor(target) {
        this.target = target
        this.state = () => store.getState()
        this.recipes = this.state().recipeLoader.get('recipes')
        console.log(this.recipes.get(0).output.toJS())
        console.log(this.recipes.get(0).input.hasItemWithName("thermalfoundation:storage_alloy:7"))
        console.log(this.recipes.size)
        console.log(this.recipes.getRecipesWithOutputName("actuallyadditions:block_grinder_double:0"))
    }
}

