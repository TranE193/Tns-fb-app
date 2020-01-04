import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from './root.reducer';
import { RootState } from './root.reducer';

export const getRootState = createFeatureSelector<fromRoot.RootState>(fromRoot.rootFeatureKey);

const getLoaded = createSelector(getRootState, (state: RootState) => state.loaded);

const getCurrentUser = createSelector(getRootState, (state: RootState) => {
    return state.currentUser;
});

export const rootQuery = {
    getLoaded, getCurrentUser
};
