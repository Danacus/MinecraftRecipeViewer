import { toJS } from 'immutable'

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

  isBlacklisted(blacklist) {
    return blacklist.get('items').some(item => {
      return ((this.stacks.some(stack => stack.name.match(item))
      || (this.stacks.some(stack => stack.oreDict.some(oreDict => oreDict.match(item))))))
    })
  }
}
