import { NodeList } from '../classes/Lists'
import { List, toJS } from 'immutable';
import { log } from 'util';

export const noCraftToRevert = (current, nodes, target) => {
  if (current.getChildren(nodes).size == 1 && current.getParents().size == 1)
    if (current.getParents().get(0) && current.getChildren(nodes).get(0))
      if (current.getParents().get(0).stack.name == current.getChildren(nodes).get(0).stack.name) return false

  /*if (current.getChildren(nodes).size > 0 && current.getChildren(nodes).every(child => {
    if (current.getParents().size > 0 && current.hasParent(child)) return true
    else return false
  })) return false*/
  return true
}

export const noLoops = (current, nodes, target) => {
  if (current.getChildren(nodes).size == 1) {
    let next = current.getChildren(nodes).get(0)
    while (next.getChildren(nodes).size > 0) {
      if (next.stack.name == current.stack.name 
        || next.getChildren(nodes).some(child => child.stack.name == current.stack.name)) return false
      if (next.getChildren(nodes).size > 1) return true
      next = next.getChildren(nodes).get(0)
    } 
  }
  return true
}

export const noIsolatedGroups = (current, nodes, target, previousNodes = new NodeList()) => {
  let result = false
  previousNodes = previousNodes.push(current)
  if (current.stack.name == target) return true

  current.getChildren(nodes).forEach(child => {
    if (current.stack.name == target) result = true
    else if (!previousNodes.includes(child)) {
      if (noIsolatedGroups(child, nodes, target, previousNodes)) {
        result = true
      }
    } 
  })

  return result
}

export const noBlacklisted = (current, nodes, target, blacklist) => {
  return !current.isBlacklisted(blacklist)
}

export const activationKiller = (current, nodes, target, min) => {
  return current.activation >= min
}

let allowedList = undefined

export const shortest2 = (current, nodes, target) => {
  if (!allowedList) allowedList = nextNode(current, nodes, target, new NodeList())
  console.log(allowedList.map(node => node.stack.name).toJS())
  return allowedList.some(node => node.stack.name == current.stack.name) || current.stack.name == target
}

const nextNode = (current, nodes, target, previousNodes) => {
  if (!current.hasRecipe()) {
    console.log("done") 
    return previousNodes
  }

  previousNodes = previousNodes.push(current)

  let max = 0
  let next = new NodeList()
  let nextRecipe

  //console.log(current.getRecipes().size)

  current.getRecipes().forEach(recipe => {
    let activation = 1

    /*nodes.getNodesWithRecipe(recipe).forEach(node => {
      activation *= node.activation
    })*/

    recipe.input.forEach(input => {
      input.stacks.forEach(stack => {
        nodes.getNodesWithStack(stack).filter(node => !previousNodes.some(previous => previous.equals(node))).forEach(node => {
          activation *= node.activation
        })
      })
    })

    //console.log(activation)

    if (activation > max) {
      max = activation
      nextRecipe = recipe
    }
  })

  nextRecipe.input.forEach(input => {
    input.stacks.forEach(stack => {
      //console.log(nodes.getNodesWithStack(stack))
      let newNodes = nodes.getNodesWithStack(stack).filter(node => !previousNodes.some(previous => previous.equals(node)))
      if (newNodes.size > 0)
        next = newNodes
    })
  })

  console.log(next)

  return next.reduce((total, node) => {
    return total.mergeDeep(nextNode(node, nodes, target, previousNodes))
  }, new NodeList())
}




export const shortest = (current, nodes, target, recipes) => {
  if (!allowedList) allowedList = getAllowedNodes(current, nodes, target, recipes)
  console.log(allowedList.map(node => node.stack.name).toJS())
  return allowedList.some(node => node.stack.name == current.stack.name) || current.stack.name == target
}

const getAllowedNodes = (current, nodes, target, recipes) => {
  let resources = nodes.filter(node => !node.hasRecipe(recipes))
  let allowedNodes = new NodeList()
  console.log(resources.map(resource => resource.stack.name).toJS())

  resources.forEach((resource, index) => {
    let min
    let thisAllowed = new NodeList()
    let result = gotToChildren(index, resource, nodes, target, 0, new NodeList())
    //const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
    //let newList = new List(flatten(result.toJS()).filter(x => x))
    //console.log(result.toJS())
    result.forEach(option => {
      if (!min || option.length < min) {
        min = option.length
        console.log(index + " - " + min)
        thisAllowed = option.previousNodes
      }
    })
    console.log(allowedNodes.size)
    allowedNodes = allowedNodes.push(resource)
    thisAllowed.forEach(node => {
      allowedNodes = allowedNodes.push(node)
    })
    
    console.log(allowedNodes.size)
  })
  return allowedNodes
} 

const gotToChildren = (index, current, nodes, target, length, previousNodes) => {
  if (current.stack.name == target) return new NodeList([{index, length, previousNodes}])
  previousNodes = previousNodes.push(current)
  length++
  let children = current.getChildren(nodes).filter(child => !previousNodes.includes(child))

  if (children.size > 0) {
    return children.reduce((total, child) => {
      return total.mergeDeep(gotToChildren(index, child, nodes, target, length, previousNodes))
    }, new NodeList())
  } else {
    //return undefined
  }
}