import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { buildTree } from '../actions';
import { stepIntoView } from '../../filesview/actions';

import { Tree } from './Tree';

// import styles
import '../styles/tree.less';

// maps state to props
const mapStateToProps = state => {
  return {
    state: state
  };
};

// maps store dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    triggerTreeBuild: () => dispatch(buildTree()),
    triggerStepIntoView: (id) => dispatch(stepIntoView(id))
  }
}

/**
 * @description This component renders left side navigation tree
 * 
 */
class NavigationTree extends React.Component {

  constructor() {
    super();
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    this.props.triggerTreeBuild();
  }

  /**
   * @description This handles node clicks on tree 
   * Navigates to directory view on click
   * 
   * @param {number} id click node id
   */
  handleNodeClick(id) {
    this.props.triggerStepIntoView(id);
  }

  render() {
    return (
      <div className="tree-container">
        <Tree {...this.props.state.tree} handleNodeClick={this.handleNodeClick} />
      </div>
    );
  }
}

NavigationTree.propTypes = {
  state: PropTypes.object,
  triggerTreeBuild: PropTypes.func.isRequired,
  triggerStepIntoView: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTree);