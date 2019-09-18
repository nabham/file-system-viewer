import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getExtension } from 'common/utilities/basic';

////////////////////////////////// FILE MENU ///////////////////////////////////

/**
 * @description This component render file menu
 * Contains Open, Get Info, Delete options
 */
const FileMenu = ({ isFile, closeMenu, optionClick }) => {

  let divRef = React.createRef();

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div className="file-menu" onBlur={closeMenu} tabIndex="0" ref={divRef} onMouseDown={(event) => optionClick(event.target.id)}>
      {
        !isFile ?
          <button id="open">Open</button> :
          null
      }
      <button id="info">Get Info</button>
      <button id="delete" className="danger">Delete</button>
    </div>
  );
}

FileMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  optionClick: PropTypes.func.isRequired,
  isFile: PropTypes.bool.isRequired
};

/////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ADD NEW /////////////////////////////////////

/**
 * @description This component render add new widget
 */
export const AddNew = ({ onCreate }) => {
  return (
    <div className="addnew-container" onClick={onCreate}>+</div>
  );
};

AddNew.propTypes = {
  onCreate: PropTypes.func.isRequired
};
/////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// ADD NEW /////////////////////////////////////

/**
 * @description This component render image container for file widget
 * contains image, file extension and file option menu
 */
const ImageContainer = (props) => {
  return (
    <React.Fragment>
      <img src={props.isFile ? '/images/file.png' : '/images/dir.png'} alt={props.isFile ? "file" : "directory"} />
      <div>{props.name}</div>
      {props.menu ? <FileMenu {...props} /> : null}
    </React.Fragment>
  )
}

ImageContainer.propTypes = {
  name: PropTypes.string.isRequired,
  menu: PropTypes.bool.isRequired,
  isFile: PropTypes.bool.isRequired
};
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////// FILE /////////////////////////////////////

/**
 * @description This component render file widget
 * 
 */
export const File = (props) => {

  const [menu, setMenu] = useState(false);

  function closeMenu() {
    setMenu(false);
  }

  function fileSelected(e) {
    setMenu(true);
    e.preventDefault();
  }

  function optionClick(type) {
    props.menuItemClick(type, props.id, props.isFile);
  }

  function handleDblClick() {
    props.menuItemClick('open', props.id, props.isFile);
  }

  return (
    <React.Fragment>
      {
        props.isFile ?
          <div className="file-container" onContextMenu={fileSelected}>
            <ImageContainer {...props} menu={menu} closeMenu={closeMenu} optionClick={optionClick} />
            <span>{getExtension(props.name)}</span>
          </div>
          :
          <div className="directory-container" onContextMenu={fileSelected} onDoubleClick={handleDblClick}>
            <ImageContainer {...props} menu={menu} closeMenu={closeMenu} optionClick={optionClick} />
          </div>
      }
    </React.Fragment>
  )
}

File.propTypes = {
  menuItemClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  isFile: PropTypes.bool.isRequired
};
/////////////////////////////////////////////////////////////////////////////