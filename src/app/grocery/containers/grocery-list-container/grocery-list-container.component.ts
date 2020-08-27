import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { Grocery } from '~/app/shared/models/grocery';
import { select, Store } from '@ngrx/store';
import { rootQuery } from '~/app/+state/root.selectors';
import { RootPartialState } from '~/app/+state/root.reducer';
import { Logout } from '~/app/+state/root.actions';
import { GroceryPartialState } from '~/app/grocery/+state/grocery.reducer';
import { groceryQuery } from '~/app/grocery/+state/grocery.selectors';
import { RemoveGrocery, RemoveGroceryList } from '../../+state/grocery.actions';

@Component({
    selector: 'ns-grocery-list-container',
    templateUrl: './grocery-list-container.component.html',
    styleUrls: ['./grocery-list-container.component.scss']
})
export class GroceryListContainerComponent implements OnInit {

    groceries$: Observable<Grocery[]>;
    currentUser$: Observable<User>;

    constructor(private groceryStore: Store<GroceryPartialState>, private rootStore: Store<RootPartialState>) { }

    ngOnInit() {
        this.groceries$ = this.groceryStore.pipe(select(groceryQuery.getList));
        this.currentUser$ = this.rootStore.pipe(select(rootQuery.getCurrentUser));
    }

    onLogout() {
        this.rootStore.dispatch(new Logout());
    }

    onRemoveGrocery(groceryId: string) {
        this.groceryStore.dispatch(new RemoveGrocery(groceryId));
    }

    onRemoveManyGroceries(groceryIds: string[]) {
        this.groceryStore.dispatch(new RemoveGroceryList(groceryIds));
    }
}
