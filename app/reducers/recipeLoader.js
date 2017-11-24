import {fromJS} from 'immutable'
import { STATUS } from '../utils/Constants'
import Recipe from '../classes/recipe'

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
      return updateBlacklist(state, action.blacklist)
    default:
      return state
  }
}

const addRecipeFile = (state, obj) => {
  let newState = state
  obj.recipes.forEach(recipe => {
    newState = newState.updateIn(['recipes'], recipes => recipes.push(
      new Recipe(recipe, obj, currentId)
    ))

    currentId++
  })

  return newState
}
  //state.updateIn(['recipes'], recipes => recipes.push(obj))

const addMap = (state, obj, name) => {
  return state.setIn([name], fromJS(obj))
}

const clearRecipeFiles = state =>
  state.setIn(['recipes'], fromJS([]))

const setStatus = (state, status) =>
  state.setIn(['status'], status)

const updateBlacklist = (state, blacklist) =>
  state.setIn(['settings', 'blacklist'], fromJS(blacklist))
