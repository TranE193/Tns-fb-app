import { Action } from '@ngrx/store';

export enum RootActionTypes {
    LoadRoots = '[Root] Load Roots',
    LoadRootsSuccess = '[Root] Load Roots Success',
    LoadRootsFailure = '[Root] Load Roots Failure',
}

export class LoadRoots implements Action {
    readonly type = RootActionTypes.LoadRoots;
}

export class LoadRootsSuccess implements Action {
    readonly type = RootActionTypes.LoadRootsSuccess;

    constructor(public payload: { data: any }) { }
}

export class LoadRootsFailure implements Action {
    readonly type = RootActionTypes.LoadRootsFailure;

    constructor(public payload: { error: any }) { }
}

export type RootActions = LoadRoots | LoadRootsSuccess | LoadRootsFailure;

