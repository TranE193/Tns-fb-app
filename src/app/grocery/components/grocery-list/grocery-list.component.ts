import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Grocery } from "~/app/shared/models/grocery";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: 'ns-grocery-list',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
    filter: string = '';

    @Input() groceries: Grocery[];
    @ViewChild("myListView", {read: RadListViewComponent, static: false}) myListViewComponent: RadListViewComponent;

    constructor(private groceryService: GroceryService) { }

    ngOnInit(): void {}

    filtering(item: Grocery): boolean { return !!item};

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

    onFilterChange(args) {
        const filterText = (<TextField>args.object).text;
        this.filtering = (item: Grocery) => {
            return item && item.name.toLowerCase().includes(filterText.toLowerCase());
        };
    }

    getUpdatedDateView(item): string {
        if(item.updatedAt) {
            const date: Date = new Date(item.updatedAt);
            return date.toLocaleString().substr(4, 20);
        }
        return '';
    }
}
