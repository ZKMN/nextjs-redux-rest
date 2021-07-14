import { fork, put, all, take, cancel } from "redux-saga/effects";
import { AxiosError } from "axios";

import { LOGOUT, showError } from "../actions/commonFlow";
import watchLastPutSagaAction from "./putSaga";
import watchLastPostSagaAction from "./postSaga";
import watchLastGetSagaAction from "./getSaga";
import watchLastDeleteSagaAction from "./deleteSaga";
import watchLastPatchSagaAction from "./patchSaga";

export default function* rootSaga(): any {
  try {
    while (true) {
      const tasks = yield all([
        fork(watchLastGetSagaAction),
        fork(watchLastPutSagaAction),
        fork(watchLastPatchSagaAction),
        fork(watchLastPostSagaAction),
        fork(watchLastDeleteSagaAction),
      ]);

      yield take(LOGOUT);
      yield cancel([...tasks]);
    }
  } catch (error) {
    yield put(showError<AxiosError>(error));
  }
}
