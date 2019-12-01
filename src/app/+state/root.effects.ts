import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadRootsFailure, LoadRootsSuccess, RootActions, RootActionTypes } from './root.actions';


@Injectable()
export class RootEffects {

    @Effect()
    loadRoots$ = this.actions$.pipe(
        ofType(RootActionTypes.LoadRoots),
        concatMap(() =>
            /** An EMPTY observable only emits completion. Replace with your own observable API request */
            EMPTY.pipe(
                map(data => new LoadRootsSuccess({data})),
                catchError(error => of(new LoadRootsFailure({error}))))
        )
    );


    constructor(private actions$: Actions<RootActions>) {}

}
