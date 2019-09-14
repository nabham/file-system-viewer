
import * as CONST from 'common/actions/constants';

import * as modelBuilder from '../model/app';

const initialState = modelBuilder.getInitialState();

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONST.MOVE_UP: {
      const [parentId, newState] = modelBuilder.slicePathAndAddView(state.currentPath);
      return Object.assign({}, state, newState, { currentViewId: parentId });
    }
    case CONST.MOVE_INTO: {
      const newPath = modelBuilder.addPath(action.payload, state);
      return Object.assign({}, state, { currentPath: newPath, currentView: modelBuilder.getView(action.payload), currentViewId: action.payload })
    }
    case CONST.DELETE_FILE: {
      modelBuilder.deleteFile(action.payload, state);
      let tree = modelBuilder.cutTree(action.payload, state.tree);
      return Object.assign({}, state, { currentView: state.currentView.filter(v => v.id !== action.payload), tree });
    }
    case CONST.DELETE_DIR: {
      modelBuilder.deleteDirectory(action.payload);
      modelBuilder.deleteFromParent(state, action.payload);
      let tree = modelBuilder.cutTree(action.payload, state.tree);
      return Object.assign({}, state, { currentView: state.currentView.filter(v => v.id !== action.payload), tree });
    }
    case CONST.CREATE_DIR: {
      let [newDir, newId] = modelBuilder.createAsset(action.payload, false, state.currentViewId);
      let newAsset = { name: newDir.name, id: newId, isFile: false };
      let tree = modelBuilder.addToTree(state.currentViewId, newAsset, state.tree);
      return Object.assign({}, state, { currentView: [newAsset].concat(state.currentView), tree });
    }
    case CONST.CREATE_FILE: {
      let [newFile, newId] = modelBuilder.createAsset(action.payload, true, state.currentViewId);
      let newAsset = { name: newFile.name, id: newId, isFile: true };
      let tree = modelBuilder.addToTree(state.currentViewId, newAsset, state.tree);
      return Object.assign({}, state, { currentView: [newAsset].concat(state.currentView), tree });
    }
    case CONST.CHANGE_DETAILS: {
      return Object.assign({}, state, { details: modelBuilder.getDetails(action.payload) });
    }
    case CONST.SEARCH_FILE: {
      return Object.assign({}, state, { currentPath: [{ name: 'search', parentId: null }], currentViewId: 'search', details: {}, currentView: modelBuilder.searchInFiles(action.payload) })
    }
    case CONST.RESET_STATE:
      return Object.assign({}, state, modelBuilder.getInitialState());
    case CONST.STEP_INTO_VIEW: {
      const newView = modelBuilder.buildView(action.payload);
      return Object.assign({}, state, newView);
    }
    case CONST.BUILD_TREE: {
      const tree = modelBuilder.buildTree();
      return Object.assign({}, state, { tree });
    }
    default:
      return state;
  }
}