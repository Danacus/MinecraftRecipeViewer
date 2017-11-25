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
import { readRecipeFiles, clearRecipeFiles, setStatus, readMap, networkCreate, networkRegenerate } from './actions/actions'
import Network from './tree2'
import { persistor } from './store/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'

export const store = configureStore({
  recipeLoader: new Immutable.Map({
    recipes: new RecipeList(),
    lookupMap: new List(),
    tooltipMap: new List(),
    settings: new Immutable.Map({
      path: `/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter`,
      blacklist: new Immutable.Map({
        items: new List([
          "/tool/",
          "/armor/",
          "/axe/",
          "/sword/",
          "/hoe/",
          "/chestplate/",
          "/leggings/",
          "/helmet/",
          "/boots/",
          "/slag/",
          "/shovel/",
          "/bed/",
          "/boat/",
          "/fence/",
          "/door/",
          "/concrete/",
          "/anvil/",
          "/cauldron/",
          "/shears/",
          "/steel/",
          "/bucket/",
          "/chest/",
          "/lever/",
          "/note/",
          "/thermal/"
        ])
      }),
      visOptions: {
        nodes: {
          shape: 'image'
        },
        edges: {
          width: 7,
          arrows: {
            middle: {enabled: true, scaleFactor: -1}
          },
          color: {inherit: 'to'}
        },
        physics: {
          enabled: true,
          barnesHut: {
            springLength: 250,
            springConstant: 0.003,
            damping: 0.1
          }
        },
        layout: {
          hierarchical: {
            enabled: false,
            nodeSpacing: 1000
          }
        }
      }
    }),
    status: STATUS.IDLE
  }),
  networkReducer: new Immutable.Map({
    networks: new Immutable.Map()
  }),
  router: {

  }
})

export const onLoad = () => {
  //let id = store.getState().networkReducer.get('networks').size
  //store.dispatch(networkRegenerate(id))

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
      let id = store.getState().networkReducer.get('networks').size
      store.dispatch(networkCreate("actuallyadditions:block_grinder_double:0", id))
      store.dispatch(networkRegenerate(id))
    })
  })
}

render(
  <PersistGate persistor={persistor}>
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  </PersistGate>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <PersistGate persistor={persistor}>
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>
      </PersistGate>,
      document.getElementById('root')
    )
  })
}
