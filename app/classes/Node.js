import { List } from "immutable";
import Item from "./Item";

export default class Node {
  constructor(stack, id, group, path) {
    this.node = {
      id,
      group,
      image: `${path}/items/${stack.name.replace(/:(.*):/, '_$1_')}.png`
    }

    this.parents = new List()
    this.stack = stack
    this.dead = false

    return this
  }

  kill(recipes) {
    this.dead = true
  }
  
  link(node) {
    if (this.parents.includes(node)) return
    this.parents = this.parents.push(node)
    return ({from: this.node.id, to: node.node.id})
  }

  getParents() {
    return this.parents
  }

  getChildren(nodes) {
    return nodes.filter(node => node.getParents().includes(this))
  }

  isBlacklisted(blacklist) {
    return new Item({stacks: [this.stack]}).isBlacklisted(blacklist)
  }

  isUseful(target, nodes, previousNodes = new NodeList()) {
    let result = false
    previousNodes = previousNodes.push(this)

    if (this.stack.name == target) return true

    this.getChildren(nodes).forEach(child => {
      if (child.stack.name == target) result = true
      else if (!previousNodes.includes(child)) {
        if (child.isUseful(target, nodes, previousNodes)) {
          result = true
        }
      } 
    })

    return result
  }
}
