import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { View } from "tns-core-modules/ui/core/view";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";
import { Grocery } from "~/app/shared/models/grocery";

@Component({
    selector: "Browse",
    styleUrls: ["./browse.component.scss"],
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit, OnChanges, OnDestroy {
    filter: string = '';
    groceries: Grocery[];
    groceries$: Observable<any>;

    constructor(private groceryService: GroceryService) { }

    @ViewChild("myListView", {read: RadListViewComponent, static: false}) myListViewComponent: RadListViewComponent;

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
}
