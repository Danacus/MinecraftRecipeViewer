import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import { fromJS, List, Map } from 'immutable'
import Immutable from 'immutable'
import './app.global.css'
import { STATUS } from './utils/Constants'
import { RecipeList } from './classes/Lists'
import { readRecipeFiles, clearRecipeFiles, setStatus, readMap } from './actions/actions'
import Tree from './tree2'

export const store = configureStore({
  recipeLoader: new Immutable.Map({
    recipes: new RecipeList(),
    lookupMap: new List(),
    tooltipMap: new List(),
    settings: {
      path: `/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter`,
      blacklist: {
        items: new List([
          /tool/,
          /armor/,
          /axe/,
          /sword/,
          /hoe/,
          /chestplate/,
          /leggings/,
          /helmet/,
          /boots/,
          /slag/i,
          /shovel/,
          /bed/,
          /boat/,
          /fence/,
          /door/,
          /concrete/,
          /anvil/,
          /cauldron/,
          /shears/,
          /steel/,
          /bucket/,
          /chest/,
          /lever/,
          /note/,
          /thermal/
        ])
      }
    },
    status: STATUS.IDLE
  }),
  router: {

  }
})

store.dispatch(clearRecipeFiles())
store.dispatch(setStatus(STATUS.LOADING('Loading recipes ...')))
store.dispatch(readRecipeFiles("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/recipes/")).then(() => {
  store.dispatch(setStatus(STATUS.LOADING('Loading maps ...')))

  let promises = [
    store.dispatch(readMap("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/lookupMap.json", "lookupMap")),
    store.dispatch(readMap("/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter/exports/tooltipMap.json", "tooltipMap"))
  ]

  Promise.all(promises).then(() => {
    store.dispatch(setStatus(STATUS.IDLE))
    let tree = new Tree("actuallyadditions:block_grinder_double:0")
  })
})

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
