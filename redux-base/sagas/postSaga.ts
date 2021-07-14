import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosResponse, AxiosError } from "axios";

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import { IRequestAction, postActions, addParamsToURL } from "utils";

export function* postSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: AxiosResponse = yield call(apiClient.post, url, action.payload);

    yield put(action.successCallback<AxiosResponse>(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback<AxiosError>(error));
    } else {
      yield put(showError<AxiosError>(error));
    }
  }
}

export default function* watchLastPostAction() {
  try {
    yield takeLatest(postActions, postSaga);
  } catch (error) {
    yield put(showError<AxiosError>(error));
  }
}
