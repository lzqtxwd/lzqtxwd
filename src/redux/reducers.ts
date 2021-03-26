import { combineReducers } from 'redux';
import { CHANGE_LANG } from './actionTypes';

const initialState = {
  lang: 'zh-CN',
};

const changeLang = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANG: {
      return {
        ...state,
        lang: action.lang,
      };

      break;
    }

    default: {
      return state;
    }
  }
};

const reducers = combineReducers({ changeLang });

export default reducers;
