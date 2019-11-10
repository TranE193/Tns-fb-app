import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { View } from "tns-core-modules/ui/core/view";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { TextField } from "tns-core-modules/ui/text-field";
import { GroceryService } from "~/app/shared/services/grocery/grocery.service";

@Component({
    selector: "Browse",
    styleUrls: ["./browse.component.scss"],
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit, OnChanges, OnDestroy {
    list = [
        {id: 1, text: 'text_1'},
        {id: 2, text: 'text_2'},
    ];
    name = '';
    amount = 0;
    list1: [];
    subscription: Subscription;
    gifts$: Observable<any>;

    constructor(private groceryService: GroceryService) { }

    @ViewChild("myListView", {read: RadListViewComponent, static: false}) myListViewComponent: RadListViewComponent;

    ngOnInit(): void {
        this.gifts$ = this.groceryService.getObservableList();
        // this.subscription = data => this.list1 = data
        this.gifts$.subscribe(data => this.list1 = data);
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log('changes', changes)
    }

    ngOnDestroy() {
        // this.gifts$.unsubscribe(data => this.list1 = data)
    }

    onButtonTap(): void {

        const date: Date = new Date();

        this.groceryService.create({
            name: this.name,
            amount: this.amount,
            createdAt: date.toUTCString(),
            // id: Math.random().toString(36).substring(2) + Date.now().toString(36)
        });

        this.name = '';
        this.amount = 0;
    }

    getTextView(item): string {
        if(item.idea && item.idea.name) {
            return `${item.idea.name}, Кол-во: ${item.idea.amount || 0} шт.`;
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

    onLayoutTap(args) {
        const message = "Tap on Layout for item: " + (args.object.bindingContext).id;
        console.log(message);
        // this.myListViewComponent.listView.notifySwipeToExecuteFinished();
        // let lbl = <Label>topmost().getViewById("lbl");
        // lbl.text += " \n" + message;
    }

    onTextNameChange(args) {
        let textField = <TextField>args.object;
        this.name = textField.text;
    }

    onTextAmountChange(args) {
        let textField = <TextField>args.object;
        this.amount = parseInt(textField.text) || 0;
    }
}
