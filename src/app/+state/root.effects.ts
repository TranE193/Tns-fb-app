import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    CreateUser, CreateUserFailure, CreateUserSuccess,
    LoadCurrentUserFailure,
    LoadCurrentUserSuccess,
    Login,
    LoginFailure,
    LoginSuccess,
    LogoutFailure,
    LogoutSuccess,
    RootAction,
    RootActionTypes
} from './root.actions';
import { UserService } from '~/app/shared/services/user/user.service';
import { User } from 'nativescript-plugin-firebase';
import { Router } from '@angular/router';


@Injectable()
export class RootEffects {

    @Effect() loadCurrentUser$ = this.actions$.pipe(ofType(RootActionTypes.LoadCurrentUser), concatMap(() => this.userService.getCurrentUser()
    .pipe(map((payload: User) => new LoadCurrentUserSuccess(payload)), catchError(error => of(new LoadCurrentUserFailure(error))))));

    @Effect({ dispatch: false }) loadCurrentUserSuccess$ = this.actions$.pipe(ofType(RootActionTypes.LoadCurrentUserSuccess), tap(() => this.router.navigate(['/'])));

    @Effect() login$ = this.actions$.pipe(ofType(RootActionTypes.Login), concatMap((action: Login) => this.userService.login(action.payload)
    .pipe(map((payload: User) => new LoginSuccess(payload)), catchError(error => of(new LoginFailure(error))))));

    @Effect({ dispatch: false }) loginSuccess$ = this.actions$.pipe(ofType(RootActionTypes.LoginSuccess), tap(() => this.router.navigate(['/'])));

    @Effect() createUser$ = this.actions$.pipe(ofType(RootActionTypes.CreateUser), concatMap((action: CreateUser) => this.userService.createUser(action.payload)
    .pipe(map((payload: User) => new CreateUserSuccess(payload)), catchError(error => of(new CreateUserFailure(error))))));

    // @Effect() createUserSuccess$ = this.actions$.pipe(ofType(RootActionTypes.CreateUserSuccess), concatMap((action: CreateUserSuccess)
    // => this.userService.sendEmailVerification(action.payload.email) .pipe(tap(() => this.router.navigate(['/'])), catchError(error =>
    // of(new CreateUserFailure(error))))));

    @Effect({ dispatch: false }) createUserSuccess$ = this.actions$.pipe(ofType(RootActionTypes.CreateUserSuccess), tap(() => this.router.navigate(['/'])));

    @Effect() logout$ = this.actions$.pipe(ofType(RootActionTypes.Logout), concatMap(() => this.userService.logout()
    .pipe(map(() => new LogoutSuccess()), catchError(error => of(new LogoutFailure(error))))));

    @Effect({ dispatch: false }) logoutSuccess$ = this.actions$.pipe(ofType(RootActionTypes.LogoutSuccess), tap(() => this.router.navigate(['/login'])));

    constructor(private actions$: Actions<RootAction>, private userService: UserService, private router: Router) {}

}
