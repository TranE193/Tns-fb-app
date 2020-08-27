import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    GroceryAction,
    GroceryActionTypes,
    LoadGrocery,
    LoadGroceryFailure,
    LoadGroceryListFailure,
    LoadGroceryListSuccess,
    LoadGrocerySuccess,
    RemoveGrocery,
    RemoveGroceryFailure,
    RemoveGroceryList,
    RemoveGroceryListFailure,
    RemoveGroceryListSuccess,
    RemoveGrocerySuccess,
    UpsertGrocery,
    UpsertGroceryFailure,
    UpsertGrocerySuccess
} from './grocery.actions';
import { UserService } from '~/app/shared/services/user/user.service';
import { Router } from '@angular/router';
import { GroceryService } from '~/app/shared/services/grocery/grocery.service';
import { Grocery } from '~/app/shared/models/grocery';


@Injectable()
export class GroceryEffects {

    @Effect() loadGroceryList$ = this.actions$.pipe(ofType(GroceryActionTypes.LoadGroceryList), concatMap(() => this.groceryService.getList()
    .pipe(map((payload: Grocery[]) => new LoadGroceryListSuccess(payload)), catchError(error => of(new LoadGroceryListFailure(error))))));

    @Effect() loadGrocery$ = this.actions$.pipe(ofType(GroceryActionTypes.LoadGrocery), concatMap((action: LoadGrocery) => this.groceryService.getItem(action.payload)
    .pipe(map((payload: Grocery) => new LoadGrocerySuccess(payload)), catchError(error => of(new LoadGroceryFailure(error))))));

    @Effect() upsertGrocery$ = this.actions$.pipe(ofType(GroceryActionTypes.UpsertGrocery), concatMap((action: UpsertGrocery) => this.groceryService.upsert(action.payload)
    .pipe(map((payload: Grocery) => new UpsertGrocerySuccess(payload)), catchError(error => of(new UpsertGroceryFailure(error))))));

    @Effect() removeGrocery$ = this.actions$.pipe(ofType(GroceryActionTypes.RemoveGrocery), concatMap((action: RemoveGrocery) => this.groceryService.remove(action.payload)
    .pipe(map(() => new RemoveGrocerySuccess()), catchError(error => of(new RemoveGroceryFailure(error))))));

    @Effect() removeGroceryList$ = this.actions$.pipe(ofType(GroceryActionTypes.RemoveGroceryList), concatMap((action: RemoveGroceryList) => this.groceryService.removeMany(action.payload)
    .pipe(map(() => new RemoveGroceryListSuccess()), catchError(error => of(new RemoveGroceryListFailure(error))))));

    constructor(private actions$: Actions<GroceryAction>, private userService: UserService, private groceryService: GroceryService, private router: Router) {}

}
