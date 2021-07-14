import Route from 'route-parser';
import { stringifyUrl } from "query-string";

import { IRequestAction } from "utils";

export const addParamsToURL = (action: IRequestAction) => {
  const {
    queryParams,
    routeParams = {},
    endpoint, 
  } = action;

  const route = new Route(endpoint);
  const urlWithRouteParams = route.reverse(routeParams) || '';

  return stringifyUrl(
    {
      url: urlWithRouteParams,
      query: queryParams, 
    },
    {
      skipNull: true,
      skipEmptyString: true,
      arrayFormat: "comma", 
    },
  );
};
