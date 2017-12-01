import { store } from './index'
import { fromJS, toJS, List, mergeDeep, merge, Map } from 'immutable'
import { ItemList, NodeList } from './classes/Lists'
import Node from './classes/Node' 
import vis from 'vis'
import { updateBlacklist, networkRemoveNode } from './actions/actions'
import { randomColor } from 'randomcolor'
import { noCraftToRevert, noIsolatedGroups, noBlacklisted, noLoops, shortest2, activationKiller } from './utils/NodeKillers';

export default class Network {
  constructor(target, id, networkSettings = fromJS({})) {
    this.target = target
    this.id = id
    this.edges = new List()
    this.nodes = new NodeList()
    this.colors = new Map()
    let state = (() => store.getState())()
    this.recipes = state.recipeLoader.get('recipes')
    this.settings = state.recipeLoader.get('settings').merge(networkSettings)
    this.killers = new List([
      {f: noBlacklisted, args: [this.settings.get('blacklist')]},
      //{f: noCraftToRevert, args: []},
      //{f: activationKiller, args: [5]},
      //{f: noLoops, args: []},
      {f: noIsolatedGroups, args: []},
      //{f: shortest2, args: []},
    ])
  }

  serialize() {
    return fromJS({
      target: this.target,
      id: this.id,
      settings: this.settings,
      colors: this.colors
    })
  }

  regenerate(state) {
    this.edges = new List()
    this.nodes = new NodeList()

    this.createNode({name: this.target, oreDict: []}, 0)
    this.nodes.forEach(node => {
      node.activate(50 * ((node.getUses().size * 0.1) / (node.distance * 2)) * (noCraftToRevert(node, this.nodes, this.target) ? 1 : 0))
      //node.node.label = node.activation.toString()
    })
    this.killNodes(node => {})
    this.visReload()

    return state.setIn(['networks', this.id], this.serialize())
  }

  visReload() {
    this.visNodes = new vis.DataSet(this.nodes.map(node => node.node).toJS())
    this.visEdges = new vis.DataSet(this.edges.toJS())

    let container = document.getElementById('tree')
    let network = new vis.Network(container, {nodes: this.visNodes, edges: this.visEdges}, this.settings.get('visOptions'))
    
    network.on("doubleClick", params => {
      if (params.nodes[0])
        this.onNodeDoubleClick(params.nodes[0])
    })
  }

  onNodeDoubleClick(id) {
    let node = this.nodes.getNodeById(id)
    store.dispatch(updateBlacklist(
      this.settings.get('blacklist').updateIn(['items'], items => items.push(new RegExp(node.stack.name, "i")))
    , this.id))
  }

  onEdgeDoubleClick(from, to) {

  }

  killNodes(onKill, killers = this.killers) {
    killers.forEach(obj => {
      this.nodes = this.nodes.filter(node => {
        let result = obj.f(node, this.nodes, this.target, ...obj.args)
        if (!result) onKill(node)
        return result
      })
    })
  }

  updateBlacklist(state, blacklist) {
    console.log(blacklist)
    let added = blacklist.get('items').filter(item => !this.settings.get('blacklist').get('items').includes(item))
    let removed = this.settings.get('blacklist').get('items').filter(item => !blacklist.get('items').includes(item))
    this.killNodes(node => this.removeNode(node.node.id), new List([
      {f: noBlacklisted, args: [blacklist]},
      {f: noCraftToRevert, args: []},
      {f: noIsolatedGroups, args: []}
    ]))

    return state = state.setIn(['networks', this.id], this.serialize())
  }

  removeNode(id) {
    this.visNodes.remove({id})
  }

  createNode(stack, group, parentNode) {
    let node = new Node(stack, this.nodes.size, group, this.recipes, this.settings.get('path'))
    if (node.stack.name == this.target) node.activation = 10
    this.nodes = this.nodes.push(node)
    let link
    if (parentNode) link = parentNode.link(node, this.colors.get(group))
    else node.distance = 1
    if (link) this.edges = this.edges.push(link)
  
    this.recipes.getRecipesWithOutputName(stack.name).forEach(recipe => {
      recipe.input.noDuplicates().removeBlacklisted(this.settings.get('blacklist')).forEach(input => {
        input.stacks.forEach(stack => {
          if (this.nodes.getNodesWithStack(stack, true).filter(node => !this.recipes.some(recipe => recipe.output.some(stack => stack.name == this.target))).size > 0) {
            this.nodes.getNodesWithStack(stack, true).forEach(parentNode => {
              if (node.stack.name != parentNode.stack.name) {
                let link = node.link(parentNode)
                if (link) this.edges = this.edges.push(link)
              }      
            })
          } else {
            this.createNode(stack, recipe.id, node)
          }
        })
      })
    })
  }
}

