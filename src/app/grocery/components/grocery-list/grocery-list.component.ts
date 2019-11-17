import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Grocery } from "~/app/shared/models/grocery";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { TextField } from "tns-core-modules/ui/text-field";
import { Observable } from "rxjs";

@Component({
    selector: 'ns-grocery-list',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit, OnChanges, OnDestroy {
    filter: string = '';
    groceries: Grocery[];
    groceries$: Observable<any>;
    @ViewChild("myListView", {read: RadListViewComponent, static: false}) myListViewComponent: RadListViewComponent;

    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {
        this.groceries$ = this.groceryService.getObservableList();
        this.groceries$.subscribe(data => this.groceries = data);
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log('changes', changes)
    }

    ngOnDestroy() {
        // this.gifts$.unsubscribe(data => this.list = data)
    }

    getTextView(item): string {
        if(item && item.name) {
            return `${item.name}, Кол-во: ${item.amount || 0} шт.`;
        }
        return item.id;
    }

    getItemView(item): string {
        if(item.createdAt) {
            const date: Date = new Date(item.createdAt);
            return date.toLocaleString().substr(4, 20);
        }
        return item.id;
    }

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args.object;
        const rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onRightSwipeClick(args: ListViewEventData) {
        const item = args.object.bindingContext;
        this.groceryService.remove(item.id);
    }

    onAddButtonTap(): void {
        const date: Date = new Date();

        this.groceryService.create({
            name: 'this.name',
            amount: 'this.amount',
            createdAt: date.toUTCString(),
            // id: Math.random().toString(36).substring(2) + Date.now().toString(36)
        });

        // this.grocery.name = '';
        // this.grocery.amount = 0;
    }

    onFilterChange(args) {
        let textField = <TextField>args.object;
        // this.grocery.name = textField.text;
        console.log(textField.text);
    }
}
