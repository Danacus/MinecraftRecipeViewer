import { List } from 'immutable'
import jetpack from 'fs-jetpack'
const req = require.context("../plugins/", true, /^(.*\.(js$))[^.]*$/igm)
let plugins = new List()

const loadAllPlugins = () => {
  plugins = req.keys().map(req)
  return plugins
}

export { loadAllPlugins }