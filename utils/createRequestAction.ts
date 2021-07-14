import { StringifiableRecord } from "query-string";
import { addActionToSagas, createActionType } from "utils";

export interface IAppAction<T = any> {
  type: string | undefined;
  data: T;
}

interface IRequestPayload {
  payload?: Record<string, unknown>; 
  routeParams?: Record<string, unknown>;
  [key: string]: unknown; 
}

export interface IRequestAction {
  type: string | undefined;
  payload: Record<string, unknown>;
  endpoint: string;
  responseType?: string;
  queryParams?: StringifiableRecord;
  routeParams?: Record<string, unknown>;
  successCallback: <T>(response: T) => IAppAction<T>;
  failureCallback?: <T>(response: T) => IAppAction<T>;
}

export const createRequestAction = (
  actionType: ReturnType<typeof createActionType>,
  endpoint: string,
  responseType?: string,
) => (
  requestPayload?: IRequestPayload,
): IRequestAction => {

  const { payload, routeParams, ...rest } = Object(requestPayload);

  addActionToSagas(actionType);

  const successCallback = <T>(response: T): IAppAction<T> => ({
    type: actionType.SUCCESS,
    data: response,
  });
  const failureCallback = <T>(response: T): IAppAction<T> => ({
    type: actionType.FAILURE,
    data: response,
  });

  const action: IRequestAction = { 
    type: actionType.REQUEST,
    queryParams: { ...rest },
    routeParams,
    payload,
    endpoint,
    responseType,
    successCallback,
    ...(actionType.FAILURE && { failureCallback }), 
  };

  return action;
};