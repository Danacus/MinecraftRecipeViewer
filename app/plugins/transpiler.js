import Plugin from '../api/plugin'

const transpiler = new Map([
  [/</g, "new CTItemStack(\""],
  [/>/g, "\")"],
  [/(as \w+)/g, ""]
])

export default class Transpiler extends Plugin {
  constructor() {
    super()
    this.name = "Transpiler"
  }

  getTranspiler() {
    return transpiler
  }
}
