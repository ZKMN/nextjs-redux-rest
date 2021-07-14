import {
  createRequestAction,
  createActionType,
  XHRMethod,
} from "utils";

// ------------------------Action constants---------------
export const LOGIN = createActionType("LOGIN", XHRMethod.Get);

// ------------------------Action creators----------------
export const someActionGetRequest = createRequestAction(LOGIN, "");