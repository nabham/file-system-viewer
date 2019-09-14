import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BreadCrumb from 'common/components/breadcrumb/BreadCrumb';
import SearchView from './SearchView';

import { moveUp, searchFile, triggerReset } from '../actions';
import { animate } from 'common/utilities/animation';

// import styles
import '../styles/Header.less';

// maps state to props
const mapStateToProps = state => {
  return {
    app: state
  };
};

// maps store dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    triggerMoveUp: () => dispatch(moveUp()),
    searchFiles: (text) => dispatch(searchFile(text)),
    reset: () => dispatch(triggerReset())
  }
}

/**
 * @description This Component render header on view
 * Includes -> Move up button and breadcrumb
 */
class Header extends React.Component {

  constructor() {
    super();
    this.moveUpImgRef = React.createRef(null);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  // Handles search text change
  handleSearchChange(text) {
    if(!text) {
      this.props.reset();
    } else {
      this.props.searchFiles(text);
    }
  }

  // Handles moving up action
  handleMoveUp() {
    // Discard going up if root node
    if (this.props.app.currentPath.length > 1) {
      animate(this.moveUpImgRef.current, 'moveup-animation', 200);
      // Triggers a dispatch to reducer for moving up
      this.props.triggerMoveUp();
    }
  }

  render() {
    return (
      <div className="header">
        <div className="breadcrumb">
          <img src="/images/move-up.png" alt="move up" ref={this.moveUpImgRef} onClick={this.handleMoveUp} />
          <BreadCrumb paths={this.props.app.currentPath} />
        </div>
        <SearchView handleSearch={this.handleSearchChange} />
      </div>
    )
  }
};

Header.propTypes = {
  app: PropTypes.object,
  triggerMoveUp: PropTypes.func.isRequired,
  searchFiles: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
