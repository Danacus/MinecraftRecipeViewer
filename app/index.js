import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import {fromJS} from 'immutable'
import './app.global.css'
import { STATUS } from './utils/Constants'

const store = configureStore({
  recipeLoader: fromJS({
    recipes: [

    ],
    lookupMap: [

    ],
    tooltipMap: [

    ],
    settings: {
      path: `/home/daan/Documents/Development/JEIExporter/run/config/jeiexporter`,
      blacklist: {
        items: [
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
        ]
      }
    },
    status: STATUS.IDLE
  }),
  router: {

  }
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
