import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '~/app/shared/models/grocery';
import { User } from 'nativescript-plugin-firebase';
import { select, Store } from '@ngrx/store';
import { GroceryPartialState } from '~/app/grocery/+state/grocery.reducer';
import { groceryQuery } from '~/app/grocery/+state/grocery.selectors';
import { UpsertGrocery } from '~/app/grocery/+state/grocery.actions';
import { rootQuery } from '~/app/+state/root.selectors';
import { RootPartialState } from '~/app/+state/root.reducer';

@Component({
    selector: 'ns-grocery-container', templateUrl: './grocery-container.component.html', styleUrls: ['./grocery-container.component.scss']
})
export class GroceryContainerComponent implements OnInit {

    grocery$: Observable<Grocery>;
    currentUser$: Observable<User>;

    constructor(private groceryStore: Store<GroceryPartialState>, private rootStore: Store<RootPartialState>) { }

    ngOnInit() {
        this.grocery$ = this.groceryStore.pipe(select(groceryQuery.getGrocery));
        this.currentUser$ = this.rootStore.pipe(select(rootQuery.getCurrentUser));

    }

    onUpsertGrocery(grocery: Grocery) {
        this.groceryStore.dispatch(new UpsertGrocery(grocery));
    }
}
