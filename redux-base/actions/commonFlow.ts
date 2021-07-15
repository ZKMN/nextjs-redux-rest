export const LOGOUT = 'LOGOUT';
export const SHOW_ERROR = 'SHOW_ERROR';
export const RESET_REDUCER = 'RESET_REDUCER';
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

export const showError = <T>(error: T) => ({
  type: SHOW_ERROR,
  data: error,
});

export const resetReducerAction = () => ({ type: RESET_REDUCER });
export const locationChangeAction = () => ({ type: LOCATION_CHANGE });
