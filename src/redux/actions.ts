import { CHANGE_LANG } from './actionTypes';

/**
 *
 * @param lang
 * @returns
 */
export const changeLangAction = (lang) => {
  return {
    type: CHANGE_LANG,
    lang,
  };
};
