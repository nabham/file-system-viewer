import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @description This component is used to render single Tree Node
 * Handles node clicks and expansion of directories
 * 
 * @param {object} props props passed from Tree
 */
const TreeNode = (props) => {

  const hasChild = (props.child || []).length > 0;

  // Handles expansion toggle
  const handleToggle = (e) => {
    if (hasChild) {
      props.handleExpansionToggle();
    }
    e.stopPropagation();
  }

  const handleNodeClick = (e) => {
    if (props.child) {
      props.handleNodeClick(props.id);
    }
    e.stopPropagation();
  }

  return (
    <div className={`tree-node ${props.child ? 'hand' : ''}`} onClick={handleNodeClick}>
      <span>
        <img src={props.child ? '/images/dir.png' : '/images/file.png'} />
        <span>{props.name}</span>
      </span>
      {
        hasChild && <img src="http://nosmalltask2.s3-website.ap-south-1.amazonaws.com/assets/icons/functional/dropdown.svg" onClick={handleToggle} className={props.expanded ? 'rotate180' : ''} />
      }

    </div>
  );
};

TreeNode.propTypes = {
  child: PropTypes.array,
  handleExpansionToggle: PropTypes.func.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  name: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

/**
 * @description This component is used to render Tree
 * if Tree node contains children node, it calls itself
 * 
 * @param {object} props props passed from NavigationTree
 */
export const Tree = (props) => {

  let [expanded, toggleExpanded] = useState(false);

  const handleExpansionToggle = () => {
    toggleExpanded(!expanded);
  }

  return (
    <div className="tree-parent">
      <TreeNode name={props.name} id={props.id} child={props.child} handleNodeClick={props.handleNodeClick} handleExpansionToggle={handleExpansionToggle} expanded={expanded} />
      {
        expanded &&
        <div className="tree-child">
          {
            (props.child || []).map(childNode => <Tree key={childNode.id} {...childNode} handleNodeClick={props.handleNodeClick} />)
          }
        </div>
      }
    </div>
  );
};

Tree.propTypes = {
  child: PropTypes.array,
  handleNodeClick: PropTypes.func.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};