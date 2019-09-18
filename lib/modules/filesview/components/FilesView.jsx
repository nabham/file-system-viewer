import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Popup from 'common/components/popup/Popup';
import { deleteDirectory, deleteFile, moveInto, createFile, createDir, changeInfo, stepIntoView } from '../actions';
import { File, AddNew } from './File';
import { CreateAsset, FileInfo } from './FilePopups';

// import styles
import '../styles/FilesView.less';

// maps state to props
const mapStateToProps = state => {
  return {
    app: state
  };
};

// maps store dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    triggerMoveInto: (id) => dispatch(moveInto(id)),
    triggerDirectoryDelete: (id) => dispatch(deleteDirectory(id)),
    triggerFileDelete: (id) => dispatch(deleteFile(id)),
    triggerFileCreate: (details) => dispatch(createFile(details)),
    triggerDirectoryCreate: (details) => dispatch(createDir(details)),
    triggerDetailChange: (id) => dispatch(changeInfo(id)),
    triggerStepIntoView: (id) => dispatch(stepIntoView(id))
  };
};

/**
 * @description This component renders main file system view
 * contains files view, new widget, file | directory options
 * 
 */
class FilesView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      conflict: ''
    };

    this.menuItemClick = this.menuItemClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.handleNewAsset = this.handleNewAsset.bind(this);
  }

  menuItemClick(type, id, isFile) {

    switch (type) {
      case 'delete':
        (isFile ? this.props.triggerFileDelete(id) : this.props.triggerDirectoryDelete(id));
        break;
      case 'open':
        if (this.props.app.currentViewId === 'search') {
          this.props.triggerStepIntoView(id);
        } else {
          this.props.triggerMoveInto(id);
        }
        break;
      case 'info':
        // get info
        this.props.triggerDetailChange(id);
        this.setState({ popup: 'info' });
        break;
    }
  }

  handleCreateClick() {
    this.setState({ popup: 'create' });
  }

  handleNewAsset(asset, type, isForce) {
    const existingAsset = this.props.app.currentView.find(existingAsset => existingAsset.name === asset.name);
    if (!isForce && existingAsset) {
      this.setState({ conflict: 'Name conflict' });
    } else {
      // If asset already exists and force is true, delete the existing asset
      if (existingAsset) {
        (existingAsset.isFile ? this.props.triggerFileDelete(existingAsset.id) : this.props.triggerDirectoryDelete(existingAsset.id));
      }
      if (this.state.conflict) {
        this.setState({ conflict: '' });
      }
      (type === 'file' ? this.props.triggerFileCreate(asset) : this.props.triggerDirectoryCreate(asset));
      this.closePopUp();
    }
  }

  closePopUp() {
    this.setState({ popup: false });
  }

  render() {
    return (
      <div className="container">

        {(this.props.app.currentView || []).map((asset) => {
          return (<File {...asset} key={asset.id} menuItemClick={this.menuItemClick} />)
        })}

        {this.props.app.currentViewId !== 'search' ? <AddNew onCreate={this.handleCreateClick} /> : null}

        <Popup visible={this.state.popup} onlyChild={true}>
          {
            this.state.popup === 'create' && <CreateAsset onClose={this.closePopUp} onCreateNew={this.handleNewAsset} conflict={this.state.conflict} />
          }
          {
            this.state.popup === 'info' && <FileInfo {...this.props.app.details} onClose={this.closePopUp} />
          }
        </Popup>
      </div>
    )
  }
};

FilesView.propTypes = {
  triggerMoveInto: PropTypes.func.isRequired,
  triggerDirectoryDelete: PropTypes.func.isRequired,
  triggerFileDelete: PropTypes.func.isRequired,
  triggerFileCreate: PropTypes.func.isRequired,
  triggerDirectoryCreate: PropTypes.func.isRequired,
  triggerDetailChange: PropTypes.func.isRequired,
  triggerStepIntoView: PropTypes.func.isRequired,
  triggerMoveInto: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesView);
