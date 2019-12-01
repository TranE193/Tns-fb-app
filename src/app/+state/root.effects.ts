import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
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
import { UserService } from "~/app/shared/services/user/user.service";
import { User } from "nativescript-plugin-firebase";
import { Router } from "@angular/router";


@Injectable()
export class RootEffects {

    @Effect()
    loadCurrentUser$ = this.actions$.pipe(
        ofType(RootActionTypes.LoadCurrentUser),
        concatMap(() => this.userService.getCurrentUser().pipe(
            map((payload: User) => new LoadCurrentUserSuccess(payload)),
            catchError(error => of(new LoadCurrentUserFailure(error))))
        )
    );

    @Effect()
    login$ = this.actions$.pipe(
        ofType(RootActionTypes.Login),
        concatMap((action: Login) => this.userService.login(action.payload).pipe(
            map((payload: User) => new LoginSuccess(payload)),
            catchError(error => of(new LoginFailure(error))))
        )
    );

    // @Effect({dispatch: false}) loginSuccess$ = this.actions$.pipe(
    //     ofType(RootActionTypes.LoginSuccess),
    //     tap(() => {
    //         console.log(this.router);
    //         return this.router.navigate([{outlets: {groceries: ['/groceries']}}])
    //     })
    // );

    @Effect()
    logout$ = this.actions$.pipe(
        ofType(RootActionTypes.Logout),
        concatMap(() => this.userService.logout().pipe(
            map(() => new LogoutSuccess()),
            catchError(error => of(new LogoutFailure(error))))
        )
    );

    constructor(private actions$: Actions<RootAction>, private userService: UserService, private router: Router) {}

}
