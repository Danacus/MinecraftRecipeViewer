// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import recipeLoader from './recipeLoader'
import networkReducer from './networkReducer'
import pluginLoader from './pluginLoader'
import crafttweakerReducer from './crafttweakerReducer'

const rootReducer = combineReducers({
  recipeLoader,
  router,
  networkReducer,
  pluginLoader,
  crafttweakerReducer
})

export default rootReducer
