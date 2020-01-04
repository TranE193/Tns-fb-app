import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LoadCurrentUser } from '~/app/+state/root.actions';
import { RootPartialState } from '~/app/+state/root.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RootResolver implements Resolve<any> {
    constructor(private store: Store<RootPartialState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new LoadCurrentUser());
    }
}
