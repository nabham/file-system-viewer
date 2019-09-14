import * as CONST from 'common/actions/constants';

// Creates delete directory action
export const deleteDirectory = (id) => {
  return {
    type: CONST.DELETE_DIR,
    payload: id
  };
};

// Creates delete file action
export const deleteFile = (id) => {
  return {
    type: CONST.DELETE_FILE,
    payload: id
  };
};

// Creates moving into directory action
export const moveInto = (id) => {
  return {
    type: CONST.MOVE_INTO,
    payload: id
  };
};

// Creates new file action
export const createFile = (details) => {
  return {
    type: CONST.CREATE_FILE,
    payload: details
  };
};

// Creates new directory action
export const createDir = (details) => {
  return {
    type: CONST.CREATE_DIR,
    payload: details
  };
};

// Creates fetch info action
export const changeInfo = (id) => {
  return {
    type: CONST.CHANGE_DETAILS,
    payload: id
  };
};

// Creates stepping into random view from anywhere action
export const stepIntoView = (id) => {
  return {
    type: CONST.STEP_INTO_VIEW,
    payload: id
  };
};