import { Map } from 'immutable'

const transpiler = new Map([
  [/</g, "new CTItemStack(\""],
  [/(>)(\..+?\))/g, "\")$2.getItem()"],
  [/>/g, "\").getItem()"],
  [/(as \w+)/g, ""]
])

export { transpiler }