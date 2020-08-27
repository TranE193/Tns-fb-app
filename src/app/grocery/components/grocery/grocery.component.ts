import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Grocery } from '~/app/shared/models/grocery';
import { User } from 'nativescript-plugin-firebase';

interface GroceryForm {
    name: string,
    amount: string
}

@Component({
    selector: 'ns-grocery', templateUrl: './grocery.component.html', styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit, AfterViewInit {
    groceryForm: GroceryForm = {
        name: '', amount: '1'
    };


    @Input() grocery: Grocery;
    @Input() currentUser: User;
    @Output() upsertGrocery = new EventEmitter();
    @ViewChild('nameTextField', { static: false }) nameTextField: ElementRef;

    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        // the best nativescript workaround :(
        setTimeout(() => {
            this.nameTextField.nativeElement.focus();
        }, 400);
    }

    onBackTap(): void {
        this.routerExtensions.back();
    }

    onTextNameChange(args) {
        let textField = <TextField>args.object;
        this.groceryForm.name = textField.text;
    }

    onTextAmountChange(args) {
        let textField = <TextField>args.object;
        this.groceryForm.amount = textField.text;
    }

    onButtonTap(): void {
        const date: Date = new Date();
        this.upsertGrocery.emit({
            id: this.grocery ? this.grocery.id : null,
            name: this.groceryForm.name,
            amount: parseInt(this.groceryForm.amount) || 1,
            createdAt: this.grocery ? this.grocery.createdAt : date.toUTCString(),
            updatedAt: date.toUTCString(),
            createdBy: this.grocery && this.grocery.createdBy ? this.grocery.createdBy : this.currentUser.uid,
            updatedBy: this.currentUser.uid
        });

        this.onBackTap();
    }
}
