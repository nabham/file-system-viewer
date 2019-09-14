import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description This component handles application breadcrumb
 */
const BreadCrumb = ({ paths }) => {
  return (
    <div className="paths">
      {
        paths.map((pathObj, index) => {
          return (<span key={pathObj.name + index}>{pathObj.name} {index + 1 !== paths.length ? '/' : null} </span>);
        })
      }
    </div>
  );
};

BreadCrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
};

export default BreadCrumb;