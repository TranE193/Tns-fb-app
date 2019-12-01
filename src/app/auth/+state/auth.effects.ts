import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { AuthActions, AuthActionTypes, LoadAuthsFailure, LoadAuthsSuccess } from './auth.actions';


@Injectable()
export class AuthEffects {

    @Effect()
    loadAuths$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoadAuths),
        concatMap(() =>
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            EMPTY.pipe(
                map(data => new LoadAuthsSuccess({data})),
                catchError(error => of(new LoadAuthsFailure({error}))))
        )
    );


    constructor(private actions$: Actions<AuthActions>) {}

}
