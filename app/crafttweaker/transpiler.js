import safeEval from 'notevil'
import { transpiler } from './zsreplace'
import { context } from './ctcontext'


const transpile = (source = file) => {
  let output = source
  transpiler.forEach((value, key) => {
    output = output.replace(key, value)
  })

  console.log(output)

  return output
}

const evalScript = (script) => {
  let result = safeEval(script, context)
}


export {transpile, evalScript}