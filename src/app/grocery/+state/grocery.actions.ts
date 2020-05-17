import { Action } from '@ngrx/store';
import { Grocery } from '~/app/shared/models/grocery';

export enum GroceryActionTypes {
    LoadGrocery = '[Grocery] LoadGrocery', LoadGrocerySuccess = '[Grocery] LoadGrocerySuccess', LoadGroceryFailure = '[Grocery] LoadGroceryFailure',

    CleanGrocery = '[Grocery] CleanGrocery',

    LoadGroceryList = '[Grocery] LoadGroceryList', LoadGroceryListSuccess = '[Grocery] LoadGroceryListSuccess', LoadGroceryListFailure = '[Grocery] LoadGroceryListFailure',

    CreateGrocery = '[Grocery] CreateGrocery', CreateGrocerySuccess = '[Grocery] CreateGrocerySuccess', CreateGroceryFailure = '[Grocery] CreateGroceryFailure',
}

export class LoadGrocery implements Action {
    readonly type = GroceryActionTypes.LoadGrocery;

    constructor(public payload: string) { }
}

export class LoadGrocerySuccess implements Action {
    readonly type = GroceryActionTypes.LoadGrocerySuccess;

    constructor(public payload: Grocery) { }
}

export class LoadGroceryFailure implements Action {
    readonly type = GroceryActionTypes.LoadGroceryFailure;

    constructor(public payload: string) { }
}

export class CleanGrocery implements Action {
    readonly type = GroceryActionTypes.CleanGrocery;
}

export class LoadGroceryList implements Action {
    readonly type = GroceryActionTypes.LoadGroceryList;

    // constructor(public payload: string) { }
}

export class LoadGroceryListSuccess implements Action {
    readonly type = GroceryActionTypes.LoadGroceryListSuccess;

    constructor(public payload: Grocery[]) { }
}

export class LoadGroceryListFailure implements Action {
    readonly type = GroceryActionTypes.LoadGroceryListFailure;

    constructor(public payload: string) { }
}

export class CreateGrocery implements Action {
    readonly type = GroceryActionTypes.CreateGrocery;

    constructor(public payload: { email: string, password: string }) { }
}

export class CreateGrocerySuccess implements Action {
    readonly type = GroceryActionTypes.CreateGrocerySuccess;

    constructor(public payload: Grocery) { }
}

export class CreateGroceryFailure implements Action {
    readonly type = GroceryActionTypes.CreateGroceryFailure;

    constructor(public payload: string) { }
}

export type GroceryAction =
    LoadGrocery
    | LoadGrocerySuccess
    | LoadGroceryFailure
    | CleanGrocery
    | LoadGroceryList
    | LoadGroceryListSuccess
    | LoadGroceryListFailure
    | CreateGrocery
    | CreateGrocerySuccess
    | CreateGroceryFailure;

