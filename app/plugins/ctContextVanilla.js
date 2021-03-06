import Plugin from '../api/plugin'

const context = {
  recipes: {
    remove: stack => console.log("remove recipe"),
    removeAll: () => {},
    addShaped: stack => console.log("add shaped recipe"),
    addShapeless: stack => console.log("add shapeless recipe"),
    addShapedMirrored: () => {}
  },
  furnace: {
    remove: stack => console.log("remove recipe"),
    removeAll: stack => {},
    addRecipe: stack => console.log("add recipe")
  },
  CTItemStack: function(stack) {
    this.stack = stack

    this.addTooltip = () => this
    this.withTag = () => this
    this.getItem = () => this
  },
  format: {
    black: () => {},
    darkBlue: () => {},
    darkGreen: () => {},
    darkAqua: () => {},
    darkRed: () => {},
    darkPurple: () => {},
    gold: () => {},
    gray: () => {},
    darkGray: () => {},
    blue: () => {},
    green: () => {},
    aqua: () => {},
    red: () => {},
    lightPurple: () => {},
    yellow: () => {},
    white: () => {},
  },
  print: (...args) => console.log(...args),
}

export default class CTCTXVanilla extends Plugin {
  constructor() {
    super()
    this.name = "Vanilla CraftTweaker Context"
  }

  getContext() {
    return context
  }
}
