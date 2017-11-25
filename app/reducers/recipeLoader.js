import { fromJS } from 'immutable'
import { STATUS } from '../utils/Constants'
import { RecipeList } from '../classes/Lists'

let currentId = 0

export default function recipeLoader(state = {}, action) {
  switch (action.type) {
    case 'LOAD_RECIPE_FILE':
      return addRecipeFile(state, action.obj)
    case 'CLEAR_RECIPE_FILES':
      return clearRecipeFiles(state)
    case 'LOAD_MAP':
      console.log(action.obj)
      return addMap(state, action.obj, action.name)
    case 'SET_STATUS':
      return setStatus(state, action.status)
    case 'UPDATE_BLACKLIST':
      return updateBlacklist(state, action.id, action.blacklist)
    default:
      return state
  }
}

const addRecipeFile = (state, obj) => 
  state.updateIn(['recipes'], recipes => recipes.concat(new RecipeList().setRecipes(obj)))

const addMap = (state, obj, name) => 
  state.setIn([name], fromJS(obj))

const clearRecipeFiles = state =>
  state.setIn(['recipes'], new RecipeList())

const setStatus = (state, status) =>
  state.setIn(['status'], status)

const updateBlacklist = (state, id, blacklist) => 
  state.setIn(['settings', 'blacklist'], blacklist)

