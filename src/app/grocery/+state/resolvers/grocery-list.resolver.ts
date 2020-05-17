import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroceryPartialState } from '~/app/grocery/+state/grocery.reducer';
import { LoadGroceryList } from '~/app/grocery/+state/grocery.actions';

@Injectable()
export class GroceryListResolver implements Resolve<any> {
    constructor(private store: Store<GroceryPartialState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadGroceryList());
    }
}
