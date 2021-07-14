import { createSelector } from "reselect";
import { RootState } from 'index';

const getRoot = (state: RootState) => state.login;

export const loginIsLoadingSelector = createSelector(getRoot, (state) => state.isLoading);
