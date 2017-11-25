import jetpack from 'fs-jetpack'

export const readRecipeFile = path => dispatch =>
  jetpack.readAsync(path, 'json').then(file => dispatch(loadRecipeFile(file)))

export const readRecipeFiles = path => dispatch =>
  jetpack.findAsync(path, {matching: "*.json"}).then(files =>
    Promise.all(files.map(file =>
      dispatch(readRecipeFile(file))
    ))
  )

export const readMap = (path, name) => dispatch =>
  jetpack.readAsync(path, 'json').then(file => dispatch(loadMap(file, name)))

export const loadRecipeFile = obj => ({
  type: 'LOAD_RECIPE_FILE',
  obj
})

export const loadMap = (obj, name) => ({
  type: 'LOAD_MAP',
  obj,
  name
})

export const clearRecipeFiles = () => ({
  type: 'CLEAR_RECIPE_FILES'
})

export const setStatus = status => ({
  type: 'SET_STATUS',
  status
})

export const updateBlacklist = (blacklist, id) => ({
  type: 'UPDATE_BLACKLIST',
  blacklist,
  id
})

export const networkCreate = (target, id) => ({
  type: 'NETWORK_CREATE',
  target,
  id
})

export const networkRegenerate = id => ({
  type: 'NETWORK_REGENERATE',
  id
})

export const networkRemoveNode = (id, nodeId) => ({
  type: 'NETWORK_REMOVE_NODE',
  id,
  nodeId
})