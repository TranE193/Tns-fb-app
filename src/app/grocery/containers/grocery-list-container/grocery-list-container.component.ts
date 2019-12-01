import { Component, OnInit } from '@angular/core';
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { Observable } from "rxjs";
import { User } from "nativescript-plugin-firebase";
import { Grocery } from "~/app/shared/models/grocery";
import { UserService } from "~/app/shared/services/user/user.service";
import { select, Store } from "@ngrx/store";
import { rootQuery } from "~/app/+state/root.selectors";
import { RootPartialState } from "~/app/+state/root.reducer";
import { Logout } from "~/app/+state/root.actions";

@Component({
    selector: 'ns-grocery-list-container',
    templateUrl: './grocery-list-container.component.html',
    styleUrls: ['./grocery-list-container.component.scss']
})
export class GroceryListContainerComponent implements OnInit {

    groceries$: Observable<Grocery[]>;
    currentUser$: Observable<User>;

    constructor(private groceryService: GroceryService, private userService: UserService, private store: Store<RootPartialState>) { }

    ngOnInit() {
        this.groceries$ = this.groceryService.getList();
        this.currentUser$ = this.store.pipe(select(rootQuery.getCurrentUser));
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}
