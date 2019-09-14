import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/filePopups.less';

////////////////////////////////// POPUP WRAPPER ///////////////////////////////////

/**
 * @description This component creates wrapper over app popup
 * Contains Popup header, close button
 */
const PopUpWrapper = (props) => {
  return (
    <div className="create-container">
      <button className="close-button" onClick={props.onClose}>x</button>
      <h3>{props.header}</h3>
      {props.children}
    </div>
  );
}

PopUpWrapper.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired
};
/////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// FILE INFO /////////////////////////////////////

/**
 * @description This component render file | directory info popups
 * builds over top of popup wrapper HOC
 */
export const FileInfo = (props) => {

  return (
    <PopUpWrapper header="File Info" onClose={props.onClose}>
      <div className="popup-image">
        {
          props.isFile ?
            <img src="/images/file.png" alt="file" /> :
            <img src="/images/dir.png" alt="directory" />
        }
      </div>
      <div className="info-group">
        <div>
          <span>Name:</span><span>{props.name}</span>
        </div>
        <div>
          <span>Size:</span><span>{props.size}</span>
        </div>
        <div>
          <span>Creator name:</span><span>{props.createdBy}</span>
        </div>
        <div>
          <span>Created date:</span><span>{props.createdTs}</span>
        </div>
      </div>
    </PopUpWrapper>
  );
}

FileInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  createdBy: PropTypes.string,
  createdTs: PropTypes.string,
  isFile: PropTypes.bool.isRequired
};
/////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// CREATE ASSET /////////////////////////////////////

/**
 * @description This component render file | directory creator popup
 * builds over top of popup wrapper HOC
 */
export const CreateAsset = (props) => {

  let [type, setType] = useState('file');
  let [name, setName] = useState('');
  let [createdBy, setCreatedBy] = useState('');
  let [createdTs, setCreatedTs] = useState('');
  let [size, setSize] = useState('');

  function handleCreate() {
    if (name && size && createdBy) {
      props.onCreateNew({ name, createdBy, createdTs: createdTs || (new Date()), size }, type);
    }
  }

  return (
    <PopUpWrapper header="Create New" onClose={props.onClose}>
      <div onChange={(e) => setType(e.target.value)}>
        <input type="radio" name="type" id="file" value="file" defaultChecked />
        <label htmlFor="file">File</label>
        <input type="radio" name="type" id="directory" value="directory" />
        <label htmlFor="directory">Folder</label>
      </div>
      <div className="form-group">
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} required />
        <input type="text" placeholder="Creator" onChange={(e) => setCreatedBy(e.target.value)} value={createdBy} required />
        <input type="number" placeholder="Size" onChange={(e) => setSize(e.target.value)} value={size} required />
        <input type="text" placeholder="Date" onChange={(e) => setCreatedTs(e.target.value)} value={createdTs} required />
        <button onClick={handleCreate}>Create</button>
      </div>
    </PopUpWrapper>
  );
}

CreateAsset.propTypes = {
  onCreateNew: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
/////////////////////////////////////////////////////////////////////////////