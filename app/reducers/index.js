// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import recipeLoader from './recipeLoader'
import networkReducer from './networkReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'

const config = {
  key: 'root2',
  storage,
  transforms: [immutableTransform()],
  debug: true
}

const rootReducer = persistCombineReducers(config, {
  recipeLoader,
  router,
  networkReducer
})

export default rootReducer;
