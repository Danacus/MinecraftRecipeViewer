import Network from '../tree2'
import { List } from 'immutable';

let networks = new Map()

export default function networkReducer (state = {}, action) {
  switch (action.type) {
    case 'NETWORK_CREATE':
      return createNetwork(state, action.id, action.target)
    case 'NETWORK_REGENERATE':
      return regenerate(state, action.id)
    case 'UPDATE_BLACKLIST':
      return updateBlacklist(state, action.id, action.blacklist)
    case 'NETWORK_REMOVE_NODE':
      return removeNode(state, action.id, action.nodeId)
    default:
      return state
  }
}

const regenerate = (state, id) => 
  networks.get(id).regenerate(state)

const createNetwork = (state, id, target) => {
  let network = new Network(target, id)
  networks = networks.set(id, network)
  return state.updateIn(['networks'], networks => networks.set(id, network.serialize()))
}
  

const updateBlacklist = (state, id, blacklist) => {
  return networks.get(id).updateBlacklist(state, blacklist) 
}

const removeNode = (state, id, nodeId) => {
  networks.get(id).removeNode(nodeId)
  return state.updateIn(['networks', id, 'nodes'], nodes => nodes.remove(nodeId))
}
  