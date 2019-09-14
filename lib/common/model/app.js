import files from './dummy';
import { getLastItem, removeItem } from 'common/utilities/basic';

/**
 * @description This method constructs view list based on node id
 * 
 * @param {string|number} currentNode node id
 */
export const getView = (currentNode) => {
  return files[currentNode].children.map(v => ({ name: files[v].name, id: v, isFile: files[v].isFile }));
};

/**
 * @description This method constructs view list and current path based on parent id
 * called on move up trigger
 * 
 * @param {array} currentPath current path of app
 */
export const slicePathAndAddView = (currentPath) => {
  const parentId = getLastItem(currentPath).parentId;
  const newState = { currentPath: currentPath.slice(0, -1) }
  newState.currentView = getView(parentId);
  return [parentId, newState];
}

/**
 * @description This method is used to add path to currentPath of app
 * 
 * @param {string|number} id directory id to be moved into
 * @param {object} state app state
 */
export const addPath = (id, state) => {
  const newPath = state.currentPath.slice();
  newPath.push({ name: files[id].name, parentId: state.currentViewId });
  return newPath;
}

/**
 * @description This method is used to delete file from app state and data
 * 
 * @param {string|number} id directory id to be deleted
 * @param {object} state app state
 */
export const deleteFile = (id, state) => {
  let parentId = state.currentViewId;
  if (parentId === 'search') {
    parentId = state.currentView.find(view => view.id === id).parent;
  }
  removeItem(files[parentId].children, id);
  delete files[id];
}

/**
 * @description This method is used to delete directory from parent children array
 * 
 * @param {object} state app state
 * @param {string|number} id directory id to be removed
 */
export const deleteFromParent = (state, id) => {
  let parentId = state.currentViewId;
  if (parentId === 'search') {
    parentId = state.currentView.find(view => view.id === id).parent;
  }
  if (files[parentId]) {
    removeItem(files[parentId].children, id);
  }
}

/**
 * @description This method is used to delete directory from app state and data
 * 
 * @param {string|number} id directory id to be deleted
 */
export const deleteDirectory = (id) => {

  if (!files[id]) {
    return;
  }

  if (files[id].isFile || files[id].children.length === 0) {
    delete files[id];
    return;
  }
  for (var newId of files[id].children) {
    deleteDirectory(newId);
  }
  delete files[id];
}

/**
 * @description This method is used to create new asset (file | directory)
 * 
 * @param {object} payload new asset details
 * @param {boolean} isFile boolean, true if it is file otherwise false
 * @param {string|number} parent parent id where asset is to be added
 */
export const createAsset = (payload, isFile, parent) => {
  const newId = Date.now();
  const newAsset = Object.assign({}, payload, { isFile });
  if (!isFile) {
    newAsset.children = [];
  }
  files[parent].children.push(newId);
  files[newId] = newAsset;
  return [newAsset, newId];
}

/**
 * @description This method is used to search assets based on search text
 * 
 * @param {string} text text string to be searched with
 */
export const searchInFiles = (text) => {

  const newView = [];
  const findNode = (node, parent) => {
    const file = files[node];
    if (file.name.match(text)) {
      newView.push({ name: file.name, id: node, isFile: file.isFile, parent });
    }

    if (!file.isFile) {
      for (let childNode of file.children) {
        findNode(childNode, node);
      }
    }
  }

  findNode('root', null);
  return newView;
}

/**
 * @description This method is used to build view
 * It is used when directories are opened from search view or tree view
 * node id needs to searched and path is build as it is searched
 * simulates node finding algo from tree
 * 
 * @param {string|number} id node id to be build the path with
 */
export const buildView = (id) => {

  const findPath = (node, path) => {

    if (node === id) {
      return path;
    }

    const file = files[node];

    if (!file.isFile) {
      let maxPath = [];
      for (let childNode of file.children) {
        const newPath = findPath(childNode, [].concat(path).concat([{ name: files[childNode].name, parentId: node }]));
        if (newPath.length > maxPath.length) {
          maxPath = newPath;
        }
      }
      return maxPath;
    } else {
      return [];
    }
  }

  const path = findPath('root', [{ name: 'root', parentId: null }]);

  return {
    currentPath: path,
    currentView: getView(id),
    currentViewId: id
  };
}

/**
 * @description This method is used to get asset detail
 * 
 * @param {string|number} id node id 
 */
export const getDetails = (id) => {
  return files[id];
}

/**
 * @description This method is used to generate app initial state
 * 
 */
export const getInitialState = () => {
  return {
    currentPath: [{ name: 'root', parentId: null }],
    currentView: getView('root'),
    currentViewId: 'root',
    details: {}
  };
}

/**
 * @description This method is used to build tree structure for tree view
 * 
 */
export const buildTree = () => {

  let tree = { name: 'root', id: 'root' };

  const traverseTree = (node, parentNode) => {

    const file = files[node];
    if (!file.isFile) {
      parentNode.child = file.children.map(childNode => traverseTree(childNode, { name: files[childNode].name, id: childNode }));
      return parentNode;
    } else {
      return { name: file.name, id: node };
    }
  }

  traverseTree('root', tree);
  return tree;
}


/**
 * @description This method is used to add a node to tree when new asset is added
 * 
 * @param {string|number} parentId parent id
 * @param {object} assetObj newly added asset details
 * @param {object} tree app tree
 */
export const addToTree = (parentId, assetObj, tree) => {
  const newNode = { name: assetObj.name, id: assetObj.id };
  if (!assetObj.isFile) {
    newNode.child = [];
  }

  const addNode = (nodes) => {

    for (let childNode of nodes) {
      if (childNode.id === parentId) {
        childNode.child.push(newNode);
        return;
      }
    }

    for (let childNode of nodes) {
      if (childNode.child) {
        addNode(childNode.child);
      }
    }
  }

  if (parentId === 'root') {
    tree.child.push(newNode);
  } else {
    addNode(tree.child, parentId);
  }

  return tree;
}

/**
 * @description This method is used to cut tree when asset is deleted
 * 
 * @param {string|number} id id where tree needs to cut
 * @param {object} tree app tree
 */
export const cutTree = (id, tree) => {

  const deleteNode = (nodes) => {

    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      if (nodes[nodeIndex].id === id) {
        nodes.splice(nodeIndex, 1);
        return;
      }
    }

    for (let childNode of nodes) {
      if (childNode.child) {
        deleteNode(childNode.child);
      }
    }
  }

  deleteNode(tree.child);

  return tree;
}