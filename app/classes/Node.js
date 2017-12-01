import { List } from "immutable";
import Item from "./Item";

export default class Node {
  constructor(stack, id, group, recipes, path) {
    this.node = {
      id,
      group,
      image: `${path}/items/${stack.name.replace(/:/g, "_")/*.replace(/:(.*):/, '_$1_')*/}.png`
    }

    this.parents = new List()
    this.stack = stack
    this.recipes = recipes.getRecipesWithOutputName(stack.name)
    this.uses = recipes.getRecipesWithInputName(stack.name)
    this.activation = 1
    this.distance
    return this
  }

  activate(factor) {
    this.activation *= factor
    return this.activation
  }
  
  link(node) {
    if (this.parents.includes(node)) return
    this.parents = this.parents.push(node)
    if (!node.distance || this.distance < node.distance) node.distance = this.distance + 1
    return ({from: this.node.id, to: node.node.id})
  }

  getParents() {
    return this.parents
  }

  getChildren(nodes) {
    return nodes.filter(node => node.getParents().includes(this))
  }

  hasChild(nodes, node) {
    return this.getChildren(nodes).some(child => child.stack.name == node.stack.name)
  }

  hasParent(node) {
    return this.getParents().some(parent => parent.stack.name == node.stack.name)
  }

  isBlacklisted(blacklist) {
    return new Item({stacks: [this.stack]}).isBlacklisted(blacklist)
  }

  hasRecipe() {
    return this.getRecipes().size > 0
  }

  getRecipes() {
    return this.recipes
  }

  getUses() {
    return this.uses
  }

  equals(node) {
    return node.stack == this.stack
  }
}
