import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as actions from '../actions/actions';

function mapStateToProps(state) {
  return state.recipeLoader.toJS()
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
