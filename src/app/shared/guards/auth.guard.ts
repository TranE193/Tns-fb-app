import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RootPartialState } from '~/app/+state/root.reducer';
import { rootQuery } from '~/app/+state/root.selectors';
import { User } from 'nativescript-plugin-firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    currentUser: User;

    constructor(private store: Store<RootPartialState>, private router: Router) {
        this.store.pipe(select(rootQuery.getCurrentUser)).subscribe((user: User) => this.currentUser = user);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.currentUser && this.currentUser.email) { return true; }
        this.router.navigate(['/login']);
        return false;
    }

}
