export enum RequestStatuses {
  Request = "REQUEST",
  Success = "SUCCESS",
  Failure = "FAILURE",
}
export enum XHRMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export const createActionType = (
  actionName: string,
  method: XHRMethod,
  addFailureType?: boolean,
) => {
  const actionTypes = {
    REQUEST: `${actionName}_${method}_${RequestStatuses.Request}`,
    SUCCESS: `${actionName}_${method}_${RequestStatuses.Success}`,
    ...(addFailureType && { FAILURE: `${actionName}_${method}_${RequestStatuses.Failure}` }),
  };

  return actionTypes;
};
