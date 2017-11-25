import { store } from './index'
import { fromJS, toJS, List, mergeDeep, merge, Map } from 'immutable'
import { ItemList, NodeList } from './classes/Lists'
import Node from './classes/Node' 
import vis from 'vis'
import { updateBlacklist, networkRemoveNode } from './actions/actions'
import { randomColor } from 'randomcolor'

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

    let removeNodes = []
    
    this.nodes.forEach(node => {
      if (node.stack.name != name) {
        if (node.getParents().get(0) && node.getChildren(this.nodes).get(0))
          if (node.getParents().get(0).stack.name == node.getChildren(this.nodes).get(0).stack.name) node.kill()
      }
      this.nodes = this.nodes.filter(node => !node.dead)
    })  
    
    this.nodes.forEach(node => {
      if (!node.isUseful(this.target, this.nodes, new NodeList())) node.kill() 
    })

    this.nodes = this.nodes.filter(node => !node.dead)
    this.visReload()

    return state.setIn(['networks', this.id], this.serialize())
  }

  visReload() {
    this.visNodes = new vis.DataSet(this.nodes.map(node => node.node).toJS())
    this.visEdges = new vis.DataSet(this.edges.toJS())

    let container = document.getElementById('tree')
    let network = new vis.Network(container, {nodes: this.visNodes, edges: this.visEdges}, this.settings.get('visOptions'))
    
    network.on("doubleClick", params => {
      this.onDoubleClick(params.nodes[0])
    })
  }

  onDoubleClick(id) {
    let node = this.nodes.getNodeById(id)
    store.dispatch(updateBlacklist(
      this.settings.get('blacklist').updateIn(['items'], items => items.push(new RegExp(node.stack.name, "i")))
    , this.id))
  }

  updateBlacklist(state, blacklist) {
    console.log(blacklist)
    let added = blacklist.get('items').filter(item => !this.settings.get('blacklist').get('items').includes(item))
    let removed = this.settings.get('blacklist').get('items').filter(item => !blacklist.get('items').includes(item))

    added.forEach(add => {
      this.nodes.getBlacklisted(blacklist).forEach(node => {
        node.kill()
        this.removeNode(node.node.id)
      })
    })

    this.nodes = this.nodes.filter(node => !node.dead)

    this.nodes.forEach(node => {
      if (!node.isUseful(this.target, this.nodes, new NodeList())) {
        node.kill() 
        this.removeNode(node.node.id)
      }
    })

    this.nodes = this.nodes.filter(node => !node.dead)
    return state = state.setIn(['networks', this.id], this.serialize())
  }

  removeNode(id) {
    this.visNodes.remove({id})
  }

  createNode(stack, group, parentNode) {
    let node = new Node(stack, this.nodes.size, group, this.settings.get('path'))
    this.nodes = this.nodes.push(node)
    let link
    if (parentNode) link = parentNode.link(node, this.colors.get(group))
    if (link) this.edges = this.edges.push(link)
    
    this.recipes.getRecipesWithOutputName(stack.name).forEach(recipe => {
      recipe.input.noDuplicates().removeBlacklisted(this.settings.get('blacklist')).forEach(input => {
        input.stacks.forEach(stack => {
          if (this.nodes.getNodesWithStackOredict(stack).filter(node => !this.recipes.some(recipe => recipe.output.some(stack => stack.name == this.target))).size > 0) {
            this.nodes.getNodesWithStackOredict(stack).forEach(parentNode => {
              let link = node.link(parentNode)
              if (link) this.edges = this.edges.push(link)
            })
          } else {
            this.createNode(stack, recipe.id, node)
          }
        })
      })
    })
  }
}

