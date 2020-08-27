import { Action } from '@ngrx/store';
import { Grocery } from '~/app/shared/models/grocery';

export enum GroceryActionTypes {
    LoadGrocery = '[Grocery] LoadGrocery', LoadGrocerySuccess = '[Grocery] LoadGrocerySuccess', LoadGroceryFailure = '[Grocery] LoadGroceryFailure',

    CleanGrocery = '[Grocery] CleanGrocery',

    LoadGroceryList = '[Grocery] LoadGroceryList', LoadGroceryListSuccess = '[Grocery] LoadGroceryListSuccess', LoadGroceryListFailure = '[Grocery] LoadGroceryListFailure',

    UpsertGrocery = '[Grocery] UpsertGrocery', UpsertGrocerySuccess = '[Grocery] UpsertGrocerySuccess', UpsertGroceryFailure = '[Grocery] UpsertGroceryFailure',

    RemoveGrocery = '[Grocery] RemoveGrocery', RemoveGrocerySuccess = '[Grocery] RemoveGrocerySuccess', RemoveGroceryFailure = '[Grocery] RemoveGroceryFailure',

    RemoveGroceryList = '[Grocery] RemoveGroceryList', RemoveGroceryListSuccess = '[Grocery] RemoveGroceryListSuccess', RemoveGroceryListFailure = '[Grocery] RemoveGroceryListFailure',
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

export class UpsertGrocery implements Action {
    readonly type = GroceryActionTypes.UpsertGrocery;

    constructor(public payload: Grocery) { }
}

export class UpsertGrocerySuccess implements Action {
    readonly type = GroceryActionTypes.UpsertGrocerySuccess;

    constructor(public payload: Grocery) { }
}

export class UpsertGroceryFailure implements Action {
    readonly type = GroceryActionTypes.UpsertGroceryFailure;

    constructor(public payload: string) { }
}

export class RemoveGrocery implements Action {
    readonly type = GroceryActionTypes.RemoveGrocery;

    constructor(public payload: string) { }
}

export class RemoveGrocerySuccess implements Action {
    readonly type = GroceryActionTypes.RemoveGrocerySuccess;
}

export class RemoveGroceryFailure implements Action {
    readonly type = GroceryActionTypes.RemoveGroceryFailure;

    constructor(public payload: string) { }
}

export class RemoveGroceryList implements Action {
    readonly type = GroceryActionTypes.RemoveGroceryList;

    constructor(public payload: string[]) { }
}

export class RemoveGroceryListSuccess implements Action {
    readonly type = GroceryActionTypes.RemoveGroceryListSuccess;
}

export class RemoveGroceryListFailure implements Action {
    readonly type = GroceryActionTypes.RemoveGroceryListFailure;

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
    | UpsertGrocery
    | UpsertGrocerySuccess
    | UpsertGroceryFailure
    | RemoveGrocery
    | RemoveGrocerySuccess
    | RemoveGroceryFailure
    | RemoveGroceryList
    | RemoveGroceryListSuccess
    | RemoveGroceryListFailure;

