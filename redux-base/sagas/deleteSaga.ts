import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosResponse, AxiosError } from "axios";

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import { IRequestAction, deleteActions, addParamsToURL } from "utils";

export function* deleteSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: AxiosResponse = yield call(apiClient.delete, url, action.payload);

    yield put(action.successCallback<AxiosResponse>(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback<AxiosError>(error));
    } else {
      yield put(showError<AxiosError>(error));
    }
  }
}

export default function* watchLastDeleteAction() {
  try {
    yield takeLatest(deleteActions, deleteSaga);
  } catch (error) {
    yield put(showError<AxiosError>(error));
  }
}
