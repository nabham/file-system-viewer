import React from 'react';
import PropTypes from 'prop-types';

import './Popup.less';

/**
 * @description This component handles application popup modal
 * Shows popup modal and render children
 */
const Popup = (props) => {

  if (!props.visible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {props.children}
      </div>
      {
        !props.onlyChild ? <button className="close-btn" onClick={props.onClose}>x</button> : null
      }
    </div>
  );
}

Popup.propTypes = {
  visible: PropTypes.any,
  onClose: PropTypes.func
};

export default Popup;