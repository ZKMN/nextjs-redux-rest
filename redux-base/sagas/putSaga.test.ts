import { testSaga } from 'redux-saga-test-plan';

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createActionType,
  createRequestAction,
  putActions,
  XHRMethod,
} from "utils";
import watchLastPutSagaAction, { putSaga } from "./putSaga";

const PUT_ACTION = createActionType("ACTION", XHRMethod.Put, true);
const putRequest = createRequestAction(PUT_ACTION, "/put/:id/");

describe("putSaga", () => {
  describe('watchLastPutSagaAction', () => {
    it('listens deleteSaga', () => {
      testSaga(watchLastPutSagaAction)
        .next()
        .takeLatest(putActions, putSaga);
    });

    it('throw error', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      testSaga(watchLastPutSagaAction)
        .next()
        .throw(error)
        .put(showError(error)).next().isDone();
    });
  });

  describe("testing putSaga", () => {
    it("calls action.successCb", () => {
      const action = putRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });

      const response = {
        data: ['some data'],
        status: 200,
        statusText: 'ok',
        headers: {},
        config: {}, 
      };
  
      testSaga(putSaga, action)
        .next()
        .call(apiClient.put, '/put/15/?query=10', { id: 10 })
        .next(response)
        .put({
          type: PUT_ACTION.SUCCESS,
          data: response,
        }).next().isDone();
    });

    it("fires error action if js error is thrown", () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      const action = putRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });
  
      testSaga(putSaga, action)
        .next()
        .throw(error)
        .put({
          type: PUT_ACTION.FAILURE,
          data: error,
        }).next().isDone();
    });
  });
});
