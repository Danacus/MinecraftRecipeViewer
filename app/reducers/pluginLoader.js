import { fromJS, Map, List } from 'immutable'

export default function pluginLoader(state = {}, action) {
  switch (action.type) {
    case 'LOAD_PLUGINS':
      return loadPlugins(state, action.plugins)
    default:
      return state
  }
}

const loadPlugins = (state, plugins) => 
  state.setIn(['plugins'], plugins.map(plugin => plugin.name))
