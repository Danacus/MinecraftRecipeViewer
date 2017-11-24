export default class Item {
  constructor(itemRaw) {
    this.stacks = itemRaw.stacks || []
    this.amount = itemRaw.amount || 0
  }

  hasStack(stack) {
    return this.stacks.includes(stack)
  }

  matches(item) {
    let result = false

    item.stacks.forEach(stack => {
      this.stacks.forEach(thisStack => {
        stack.oreDict.forEach(oreDictName => {
          if (thisStack == stack || thisStack.oreDict.includes(oreDictName))
            result = true
        })
      })
    })

    return result
  }
}
