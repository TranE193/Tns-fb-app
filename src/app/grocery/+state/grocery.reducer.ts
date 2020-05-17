import { GroceryAction, GroceryActionTypes } from './grocery.actions';
import { Grocery } from '~/app/shared/models/grocery';

export const groceryFeatureKey = 'grocery';

export interface GroceryState {
    grocery?: Grocery;
    list: Grocery[];
    loaded: boolean;
}

export const initialState: GroceryState = {
    list: [], loaded: false
};

export interface GroceryPartialState {
    readonly [groceryFeatureKey]: GroceryState;
}

export function groceryReducer(state: GroceryState = initialState, action: GroceryAction): GroceryState {
    switch(action.type) {

        case GroceryActionTypes.LoadGroceryList:
            state = {
                ...state, loaded: false
            };
            break;

        case GroceryActionTypes.LoadGroceryListSuccess:
            state = {
                ...state, list: action.payload, loaded: true
            };
            break;

        case GroceryActionTypes.LoadGrocery:
            state = {
                ...state, loaded: false
            };
            break;

        case GroceryActionTypes.LoadGrocerySuccess:
            state = {
                ...state, grocery: action.payload, loaded: false
            };
            break;


        case GroceryActionTypes.CleanGrocery:
            state = {
                ...state, grocery: null
            };
            break;

        case GroceryActionTypes.CreateGrocerySuccess:
            state = {
                ...state, grocery: action.payload
            };
            break;
    }
    return state;
}
