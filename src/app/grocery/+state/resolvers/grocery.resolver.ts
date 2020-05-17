import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroceryPartialState } from '~/app/grocery/+state/grocery.reducer';
import { CleanGrocery, LoadGrocery } from '~/app/grocery/+state/grocery.actions';

@Injectable()
export class GroceryResolver implements Resolve<any> {
    constructor(private store: Store<GroceryPartialState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        route.params.id !== 'new' ? this.store.dispatch(new LoadGrocery(route.params.id)) : this.store.dispatch(new CleanGrocery());
    }
}
