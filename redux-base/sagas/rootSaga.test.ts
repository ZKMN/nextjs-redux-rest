import { fork } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { LOGOUT, showError } from 'redux-base/actions';
import watchLastPutSagaAction from "./putSaga";
import watchLastPostSagaAction from "./postSaga";
import watchLastGetSagaAction from "./getSaga";
import watchLastDeleteSagaAction from "./deleteSaga";
import watchLastPatchSagaAction from "./patchSaga";
import rootSaga from './rootSaga';

describe('rootSaga', () => {
  it('listens tasks', () => {
    const tasks = [
      fork(watchLastGetSagaAction),
      fork(watchLastPutSagaAction),
      fork(watchLastPatchSagaAction),
      fork(watchLastPostSagaAction),
      fork(watchLastDeleteSagaAction),
    ];

    testSaga(rootSaga)
      .next()
      .all(tasks)
      .next()
      .take(LOGOUT);
  });

  it('throw error', () => {
    const error = {
      name: '',
      message: '',
      response: { data: 'some data' }, 
    };

    testSaga(rootSaga)
      .next()
      .throw(error)
      .put(showError(error)).next().isDone();
  });
});
