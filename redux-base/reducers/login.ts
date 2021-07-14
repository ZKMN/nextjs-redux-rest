import produce from "immer";
import {
  LOGIN,

  SHOW_ERROR,
  RESET_REDUCER,
} from 'redux-base/actions';
import { IAppAction } from 'utils';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

const login = produce(
  (draft, action: IAppAction) => {
    switch (action.type) {
      case LOGIN.REQUEST:
        draft.isLoading = true;
        break;
      case LOGIN.SUCCESS:
        draft.isLoading = false;
        draft.isLoggedIn = true;
        draft.user = action.data.user;
        break;
      case SHOW_ERROR:
        draft.isLoading = false;
        draft.isLoggedIn = false;
        break;
      case RESET_REDUCER:
        return INITIAL_STATE;
    }
  },
  INITIAL_STATE,
);

export default login;
