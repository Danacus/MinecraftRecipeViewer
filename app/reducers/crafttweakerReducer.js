import { fromJS, toJS } from 'immutable'

export default function crafttweakerReducer(state = {}, action) {
  switch (action.type) {
    case 'MERGE_TRANSPILER':
      return mergeTranspiler(state, action.transpiler)
    case 'MERGE_CT_CONTEXT':
      return mergeCTContext(state, action.context)
    default:
      return state
  }
}

const mergeTranspiler = (state, transpiler) => 
  state.updateIn(['transpiler'], map => map.merge(transpiler))

const mergeCTContext = (state, context) => {
  state = state.updateIn(['context'], map => map.mergeDeep(fromJS(context)))
  return state
}