import { testSaga } from 'redux-saga-test-plan';

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createActionType,
  createRequestAction,
  patchActions,
  XHRMethod,
} from "utils";
import watchLastPatchSagaAction, { patchSaga } from "./patchSaga";

const PATCH_ACTION = createActionType("ACTION", XHRMethod.Patch, true);
const patchRequest = createRequestAction(PATCH_ACTION, "/patch/:id/");

describe("patchSaga", () => {
  describe('watchLastPatchSagaAction', () => {
    it('listens deleteSaga', () => {
      testSaga(watchLastPatchSagaAction)
        .next()
        .takeLatest(patchActions, patchSaga).next().isDone();
    });

    it('throw error', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      testSaga(watchLastPatchSagaAction)
        .next()
        .throw(error)
        .put(showError(error)).next().isDone();
    });
  });

  describe("testing patchSaga", () => {
    it("calls action.successCb", () => {
      const action = patchRequest({
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
  
      testSaga(patchSaga, action)
        .next()
        .call(apiClient.patch, '/patch/15/?query=10', { id: 10 })
        .next(response)
        .put({
          type: PATCH_ACTION.SUCCESS,
          data: response,
        }).next().isDone();
    });

    it("fires error action if js error is thrown", () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      const action = patchRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });
  
      testSaga(patchSaga, action)
        .next()
        .throw(error)
        .put({
          type: PATCH_ACTION.FAILURE,
          data: error,
        }).next().isDone();
    });
  });
});
