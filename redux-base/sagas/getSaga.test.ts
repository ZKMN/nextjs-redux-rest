import { testSaga } from 'redux-saga-test-plan';

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createActionType,
  createRequestAction,
  getActions,
  XHRMethod,
} from "utils";
import watchLastGetSagaAction, { getSaga } from "./getSaga";

const GET_ACTION = createActionType("ACTION", XHRMethod.Get, true);
const getRequest = createRequestAction(GET_ACTION, "/get");

describe("getSaga", () => {
  describe('watchLastGetSagaAction', () => {
    it('listens getSaga', () => {
      testSaga(watchLastGetSagaAction)
        .next()
        .takeLatest(getActions, getSaga).next().isDone();
    });

    it('throw error', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      testSaga(watchLastGetSagaAction)
        .next()
        .throw(error)
        .put(showError(error)).next().isDone();
    });
  });

  describe("testing getSaga", () => {
    it("calls action.successCb", () => {
      const action = getRequest();

      const response = {
        data: ['some data'],
        status: 200,
        statusText: 'ok',
        headers: {},
        config: {}, 
      };
  
      testSaga(getSaga, action)
        .next()
        .call(apiClient.get, '/get')
        .next(response)
        .put({
          type: GET_ACTION.SUCCESS,
          data: response,
        }).next().isDone();
    });

    it("fires error action if js error is thrown", () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      const action = getRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });
  
      testSaga(getSaga, action)
        .next()
        .throw(error)
        .put({
          type: GET_ACTION.FAILURE,
          data: error,
        }).next().isDone();
    });
  });
});
