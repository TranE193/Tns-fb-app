import { Action } from '@ngrx/store';
import { User } from "nativescript-plugin-firebase";

export enum RootActionTypes {
    LoadCurrentUser = '[Root] LoadCurrentUser',
    LoadCurrentUserSuccess = '[Root] LoadCurrentUserSuccess',
    LoadCurrentUserFailure = '[Root] LoadCurrentUserFailure',

    Login = '[Root] Login',
    LoginSuccess = '[Root] LoginSuccess',
    LoginFailure = '[Root] LoginFailure',

    Logout = '[Root] Logout',
    LogoutSuccess = '[Root] LogoutSuccess',
    LogoutFailure = '[Root] LogoutFailure',
}

export class LoadCurrentUser implements Action {
    readonly type = RootActionTypes.LoadCurrentUser;
}

export class LoadCurrentUserSuccess implements Action {
    readonly type = RootActionTypes.LoadCurrentUserSuccess;

    constructor(public payload: User) { }
}

export class LoadCurrentUserFailure implements Action {
    readonly type = RootActionTypes.LoadCurrentUserFailure;

    constructor(public payload: string) { }
}

export class Login implements Action {
    readonly type = RootActionTypes.Login;

    constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
    readonly type = RootActionTypes.LoginSuccess;

    constructor(public payload: User) { }
}

export class LoginFailure implements Action {
    readonly type = RootActionTypes.LoginFailure;

    constructor(public payload: string) { }
}

export class Logout implements Action {
    readonly type = RootActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = RootActionTypes.LogoutSuccess;
}

export class LogoutFailure implements Action {
    readonly type = RootActionTypes.LogoutFailure;

    constructor(public payload: string) { }
}

export type RootAction =
    LoadCurrentUser
    | LoadCurrentUserSuccess
    | LoadCurrentUserFailure
    | Login
    | LoginSuccess
    | LoginFailure
    | Logout
    | LogoutSuccess
    | LogoutFailure;

