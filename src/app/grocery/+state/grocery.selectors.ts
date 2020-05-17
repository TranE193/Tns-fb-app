import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGrocery from './grocery.reducer';
import { GroceryState } from './grocery.reducer';

export const getGroceryState = createFeatureSelector<fromGrocery.GroceryState>(fromGrocery.groceryFeatureKey);

const getLoaded = createSelector(getGroceryState, (state: GroceryState) => state.loaded);

const getList = createSelector(getGroceryState, (state: GroceryState) => {
    return state.list;
});
const getGrocery = createSelector(getGroceryState, (state: GroceryState) => {
    return state.grocery;
});

export const groceryQuery = {
    getLoaded, getList, getGrocery
};
