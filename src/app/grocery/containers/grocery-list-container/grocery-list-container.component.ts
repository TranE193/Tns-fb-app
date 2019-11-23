import { Component, OnInit } from '@angular/core';
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { Observable } from "rxjs";

@Component({
    selector: 'ns-grocery-list-container',
    templateUrl: './grocery-list-container.component.html',
    styleUrls: ['./grocery-list-container.component.scss']
})
export class GroceryListContainerComponent implements OnInit {

    groceries$: Observable<any>;

    constructor(private groceryService: GroceryService) { }

    ngOnInit() {
        this.groceries$ = this.groceryService.getList();
    }
}
