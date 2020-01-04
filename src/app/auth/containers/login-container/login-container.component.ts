import { Component, OnInit } from '@angular/core';
import { Login } from '~/app/+state/root.actions';
import { select, Store } from '@ngrx/store';
import { RootPartialState } from '~/app/+state/root.reducer';
import { Observable } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { rootQuery } from '~/app/+state/root.selectors';

@Component({
    selector: 'ns-login-container',
    templateUrl: './login-container.component.html',
    styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {
    email = 'ddseliverstov@gmail.com';
    password = 'TranE193';
    user$: Observable<User>;

    constructor(private store: Store<RootPartialState>) {
        this.user$ = this.store.pipe(select(rootQuery.getCurrentUser));
    }

    ngOnInit() { }

    login() {
        this.store.dispatch(new Login({ email: this.email, password: this.password }));
    }
}
