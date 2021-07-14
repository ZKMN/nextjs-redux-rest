import { testSaga } from 'redux-saga-test-plan';

import apiClient from 'api/apiClient';
import { showError } from 'redux-base/actions';
import {
  createActionType,
  createRequestAction,
  deleteActions,
  XHRMethod,
} from 'utils';
import watchLastDeleteSagaAction, { deleteSaga } from './deleteSaga';

const DELETE_ACTION = createActionType('ACTION', XHRMethod.Delete, true);
const deleteRequest = createRequestAction(DELETE_ACTION, '/delete/:id/');

describe('deleteSaga', () => {
  describe('watchLastDeleteSagaAction', () => {
    it('listens deleteSaga', () => {
      testSaga(watchLastDeleteSagaAction)
        .next()
        .takeLatest(deleteActions, deleteSaga).next().isDone();
    });

    it('throw error', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      testSaga(watchLastDeleteSagaAction)
        .next()
        .throw(error)
        .put(showError(error)).next().isDone();
    });
  });

  describe('testing deleteSaga', () => {
    it('calls action.successCb', () => {
      const action = deleteRequest({
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
  
      testSaga(deleteSaga, action)
        .next()
        .call(apiClient.delete, '/delete/15/?query=10', { id: 10 })
        .next(response)
        .put({
          type: DELETE_ACTION.SUCCESS,
          data: response,
        }).next().isDone();
    });

    it('fires error action if js error is thrown', () => {
      const error = {
        name: '',
        message: '',
        response: { data: 'some data' }, 
      };

      const action = deleteRequest({
        query: 10,
        routeParams: { id: 15 },
        payload: { id: 10 }, 
      });
  
      testSaga(deleteSaga, action)
        .next()
        .throw(error)
        .put({
          type: DELETE_ACTION.FAILURE,
          data: error,
        }).next().isDone();
    });
  });
});
