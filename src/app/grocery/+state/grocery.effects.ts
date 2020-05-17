import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    GroceryAction, GroceryActionTypes, LoadGrocery, LoadGroceryFailure, LoadGroceryListFailure, LoadGroceryListSuccess, LoadGrocerySuccess
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

    constructor(private actions$: Actions<GroceryAction>, private userService: UserService, private groceryService: GroceryService, private router: Router) {}

}
