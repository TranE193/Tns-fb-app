import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { TextField } from "tns-core-modules/ui/text-field";
import { Grocery } from "~/app/shared/models/grocery";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";

@Component({
    selector: 'ns-grocery',
    templateUrl: './grocery.component.html',
    styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit, OnChanges {
    grocery: Grocery;

    constructor(private route: ActivatedRoute, private routerExtensions: RouterExtensions, public groceryService: GroceryService) { }

    ngOnInit() {
        const id = this.route.snapshot.params.id;
        const subscription = this.groceryService.getItem(id);
        subscription.subscribe(res => this.grocery = res);
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log('onCh', changes, this.grocery)
    }

    onBackTap(): void {
        this.routerExtensions.back();
    }

    onTextNameChange(args) {
        let textField = <TextField>args.object;
        this.grocery.name = textField.text;
    }

    onTextAmountChange(args) {
        let textField = <TextField>args.object;
        this.grocery.amount = parseInt(textField.text) || 0;
    }

    onButtonTap(): void {
        const date: Date = new Date();

        this.groceryService.create({
            name: this.grocery.name,
            amount: this.grocery.amount,
            createdAt: date.toUTCString(),
            // id: Math.random().toString(36).substring(2) + Date.now().toString(36)
        });

        this.grocery.name = '';
        this.grocery.amount = 0;
    }

}
