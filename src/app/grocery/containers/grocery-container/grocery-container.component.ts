import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { Observable } from "rxjs";
import { Grocery } from "~/app/shared/models/grocery";

@Component({
    selector: 'ns-grocery-container',
    templateUrl: './grocery-container.component.html',
    styleUrls: ['./grocery-container.component.scss']
})
export class GroceryContainerComponent implements OnInit {

    grocery$: Observable<Grocery>;

    constructor(private route: ActivatedRoute, public groceryService: GroceryService) { }

    ngOnInit() {
        const id = this.route.snapshot.params.id;

        if(id !== 'new') {
            this.grocery$ = this.groceryService.getItem(id);
        }
    }

    onUpsertGrocery(grocery: Grocery) {
        !grocery.id
            ? this.groceryService.create(grocery)
            : this.groceryService.update(grocery.id, grocery);
    }
}
