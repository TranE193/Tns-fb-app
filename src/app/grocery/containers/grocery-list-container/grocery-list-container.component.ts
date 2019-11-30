import { Component, OnInit } from '@angular/core';
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { Observable } from "rxjs";
import { User } from "nativescript-plugin-firebase";
import { Grocery } from "~/app/shared/models/grocery";
import { UserService } from "~/app/shared/services/user/user.service";

@Component({
    selector: 'ns-grocery-list-container',
    templateUrl: './grocery-list-container.component.html',
    styleUrls: ['./grocery-list-container.component.scss']
})
export class GroceryListContainerComponent implements OnInit {

    groceries$: Observable<Grocery[]>;
    currentUser$: Observable<User>;

    constructor(private groceryService: GroceryService, private userService: UserService) { }

    ngOnInit() {
        this.groceries$ = this.groceryService.getList();
        this.currentUser$ = this.userService.getCurrentUser();
    }
}
