import * as CONST from 'common/actions/constants';

// Creates moving up action
export const moveUp = () => {
  return {
    type: CONST.MOVE_UP
  };
};

// Creates search file action
export const searchFile = (text) => {
  return {
    type: CONST.SEARCH_FILE,
    payload: text
  };
};

// Creates reset state action
export const triggerReset = () => {
  return {
    type: CONST.RESET_STATE
  };
};