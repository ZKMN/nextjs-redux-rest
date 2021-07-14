import { takeLatest, put, call } from "redux-saga/effects";
import { AxiosResponse, AxiosError } from "axios";

import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import { IRequestAction, getActions, addParamsToURL } from "utils";

export function* getSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: AxiosResponse = yield call(apiClient.get, url);

    yield put(action.successCallback<AxiosResponse>(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback<AxiosError>(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastGetAction() {
  try {
    yield takeLatest(getActions, getSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
