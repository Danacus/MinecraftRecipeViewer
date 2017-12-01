export default class Plugin {
  constructor() {
    this.zsTranspiler = new Map()
    this.ctContext = {}
    return this
  }

  getTranspiler() {
    return new Map()
  }

  getContext() {
    return {}
  }
}
