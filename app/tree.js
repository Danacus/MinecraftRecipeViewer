import Node from './classes/node'
import vis from 'vis'
import { log } from 'util';
import { updateBlacklist } from './actions/actions'
import { toJS } from 'immutable'

export default class Tree {
  constructor(settings, recipes, props) {
    this.settings = settings
    this.recipes = recipes
    this.props = props
  }

  generate(name) {
    this.nodes = []
    this.edges = []
    this.group = 0
    this.target = name

    console.log(this.recipes)

    let node = new Node()
    this.nodes.push(node.fromStack({name, oreDict: []}, this.nodes.length, 0, this.settings.path))
    this.addParentNodes(node)

    let removeNodes = []

    this.nodes.forEach(node => {
      if (node.stack.name != name) {
        if (node.getParents()[0] && node.getChildren(this.nodes)[0])
          if (node.getParents()[0].stack.name == node.getChildren(this.nodes)[0].stack.name) node.kill()
      }
      this.nodes = this.nodes.filter(node => !node.dead)
    })

    

    this.nodes.forEach(node => {
      if (!node.isUseful(name, this.nodes)) node.kill()
      this.nodes = this.nodes.filter(node => !node.dead)
    })

    this.buildTree(this.edges, this.nodes.map(node => node.node))
  }

  addParentNodes(node) {
    //if (this.nodes.length > 5000) return
    this.recipes.getRecipesWithOutputName(node.stack.name).forEach(recipe => {
      this.group++
      recipe.input.removeInputDuplicates().forEach(input => {
        input.stacks.forEach(stack => {
          if (!this.blacklisted(stack)) {
            if (this.nodes.getNodesWithStackOredict(stack).length > 0) {
              this.nodes.getNodesWithStackOredict(stack).forEach(parentNode => {
                //if (parentNode.stack.name != stack.name) {
                  let link = node.link(parentNode)
                  if (link) this.edges.push(link)
                //}
              })
            } else {
              let parentNode = new Node()
              this.nodes.push(parentNode.fromStack(stack, this.nodes.length, this.group, this.settings.path))
              let link = node.link(parentNode)
              if (link) this.edges.push(link)
              this.addParentNodes(parentNode)
            }
          }
        })
      })
    })
  }

  buildTree(edges, nodes) {
    console.log(edges);
    let container = document.getElementById('tree')

    let options = {
      nodes: {
        shape: 'image'
      },
      edges: {
        width: 7,
        arrows: 'from'
      },
      physics: {
        barnesHut: {
          springLength: 250,
          springConstant: 0.003,
          damping: 0.1
        }
      }
    }

    let network = new vis.Network(container, {nodes, edges}, options)

    network.on("doubleClick", params => 
      this.onDoubleClick(this.nodes.getNodeById(params.nodes[0]))
    )
  }

  blacklisted(stack) {
    let result = false
    this.settings.blacklist.items.forEach(item => {
      if (stack.name.match(item)) result = true
      stack.oreDict.forEach(oreDict => {
        if (oreDict.match(item)) result = true
      })
    })

    return result
  }

  onDoubleClick(node) {
    let blacklist = this.settings.blacklist.items.push(new RegExp(node.stack.name, "i"))
    updateBlacklist(blacklist)
    this.generate(this.target)
  }
}

Array.prototype.getNodeById = function(id) {
  return this.find(node => node.node.id == id)
}


Array.prototype.removeInputDuplicates = function() {
  let newArr = []
  let stackArr = []

  this.forEach(item => {
    item.stacks.forEach(stack => {
      if (!newArr.includes(item) && !stackArr.includes(stack.name)) {
        newArr.push(item)
        stackArr.push(stack.name)
      }
    })
  })

  return newArr
}

Array.prototype.getNodesWithRecipe = function(recipe) {
  return this.filter(node => node.recipe == recipe)
}

Array.prototype.getNodesWithStack = function(stack) {
  return this.filter(node => node.stack.name == stack.name)
}

Array.prototype.getNodesWithStackOredict = function(stack) {
  return this.filter(node => {
    if (node.stack.name == stack.name) return true
    let result = false
    node.stack.oreDict.forEach(oreDict1 => {
      stack.oreDict.forEach(oreDict2 => {
        if (oreDict1 == oreDict2) result = true
      })
    })
    return result
  })
}

Array.prototype.getRecipesWithOutputName = function(name) {
  return this.filter(recipe => recipe.output.hasItemWithName(name))
}

Array.prototype.getRecipesWithOutputOredict = function(name) {
  return this.filter(recipe => recipe.output.hasItemWithOredict(name))
}

Array.prototype.hasItemWithName = function(name) {
  let result = false
  this.forEach(item => {
    item.stacks.forEach(stack => {
      if (stack.name == name) result = true
    })
  })
  return result
}

Array.prototype.hasItemWithOredict = function(name) {
  let result = false
  this.forEach(item => {
    item.stacks.forEach(stack => {
      stack.oreDict.forEach(oreDict => {
        if (oreDict == name) result = true
      })
    })
  })
  return result
}
