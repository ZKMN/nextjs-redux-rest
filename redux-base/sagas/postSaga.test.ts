import { testSaga } from 'redux-saga-test-plan';

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createActionType,
  createRequestAction,
  postActions,
  XHRMethod,
} from "utils";
import watchLastPostSagaAction, { postSaga } from "./postSaga";

const POST_ACTION = createActionType("ACTION", XHRMethod.Post, true);
const postRequest = createRequestAction(POST_ACTION, "/post/:id/");

describe("postSaga", () => {
  describe('watchLastPostSagaAction', () => {
    it('listens deleteSaga', () => {
      testSaga(watchLastPostSagaAction)
        .next()
        .takeLatest(postActions, postSaga).next().isDone();
    });

    it('throw error', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      testSaga(watchLastPostSagaAction)
        .next()
        .throw(error)
        .put(showError(error)).next().isDone();
    });
  });

  describe("testing postSaga", () => {
    it("calls action.successCb", () => {
      const action = postRequest({
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
  
      testSaga(postSaga, action)
        .next()
        .call(apiClient.post, '/post/15/?query=10', { id: 10 })
        .next(response)
        .put({
          type: POST_ACTION.SUCCESS,
          data: response,
        }).next().isDone();
    });

    it("fires error action if js error is thrown", () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      const action = postRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });
  
      testSaga(postSaga, action)
        .next()
        .throw(error)
        .put({
          type: POST_ACTION.FAILURE,
          data: error,
        }).next().isDone();
    });
  });
});
