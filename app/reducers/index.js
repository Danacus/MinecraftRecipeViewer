// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import recipeLoader from './recipeLoader';

const rootReducer = combineReducers({
  recipeLoader,
  router,
});

export default rootReducer;
