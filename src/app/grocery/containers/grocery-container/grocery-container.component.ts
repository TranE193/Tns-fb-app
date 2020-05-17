import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '~/app/shared/models/grocery';
import { User } from 'nativescript-plugin-firebase';
import { select, Store } from '@ngrx/store';
import { GroceryPartialState } from '~/app/grocery/+state/grocery.reducer';
import { groceryQuery } from '~/app/grocery/+state/grocery.selectors';

@Component({
    selector: 'ns-grocery-container', templateUrl: './grocery-container.component.html', styleUrls: ['./grocery-container.component.scss']
})
export class GroceryContainerComponent implements OnInit {

    grocery$: Observable<Grocery>;
    currentUser$: Observable<User>;

    constructor(private groceryStore: Store<GroceryPartialState>) { }

    ngOnInit() {
        this.grocery$ = this.groceryStore.pipe(select(groceryQuery.getGrocery));
    }

    onUpsertGrocery(grocery: Grocery) {
        // !grocery.id ? this.groceryService.create(grocery) : this.groceryService.update(grocery.id, grocery);
    }
}
