export default class Node {
  /*fromRecipe(recipe, id, group, path) {
    this.node = {
      id: id,
      group: group,
      image: `${path}/items/${recipe.output[0].stacks[0].name.replace(/:(.*):/, '_$1_')}.png`
    }

    this.links = []
    this.recipe = recipe

    return this
  }*/

  fromStack(item, id, group, path) {
    this.node = {
      id: id,
      group: group,
      image: `${path}/items/${item.name.replace(/:(.*):/, '_$1_')}.png`
    }

    this.links = []
    this.stack = item
    this.dead = false

    return this
  }

  kill() {
    console.log("Kill!")
    this.dead = true
  }
  

  link(node) {
    if (this.links.includes(node)) return
    this.links.push(node)
    return ({from: this.node.id, to: node.node.id})
  }

  getParents() {
    return this.links
  }

  getChildren(nodes) {
    return nodes.filter(node => node.getParents().includes(this))
  }

  isUseful(target, nodes, previousNodes = []) {
    let result = false
    previousNodes.push(this)

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
