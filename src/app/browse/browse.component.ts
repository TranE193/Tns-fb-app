import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { FirebaseService } from "~/app/shared/services/firebase.service";
import { View } from "tns-core-modules/ui/core/view";
import { ListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";

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
    list1: [];
    subscription: Subscription;
    gifts$: Observable<any>;

    constructor(private firebaseService: FirebaseService) { }

    @ViewChild("myListView", {read: RadListViewComponent, static: false}) myListViewComponent: RadListViewComponent;

    ngOnInit(): void {

        this.gifts$ = this.firebaseService.getMyWishList();
        // this.subscription = data => this.list1 = data
        this.gifts$.subscribe(data => this.list1 = data)

        // @ts-ignore
        // this.list1 = [
        //     { id: 1, name: 'name_1'},
        //     { id: 1, name: 'name_1'},
        //     { id: 1, name: 'name_1'}
        // ];
        // this.list1 = [
        //     'name_1',
        //     'name_1',
        //     'name_1',
        //     'name_1',
        // ];
        // console.log('s', this.gifts$);
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log('changes', changes)
    }

    ngOnDestroy() {
        // this.gifts$.unsubscribe(data => this.list1 = data)
    }

    onButtonTap(): void {
        const date: Date = new Date();

        this.firebaseService.push('/ideas', {
            idea1: {newIdea: "new_idea_1"},
            createdAt: date.toUTCString(),
            // id: Math.random().toString(36).substring(2) + Date.now().toString(36)
        })
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
        this.firebaseService.remove('/ideas', item.id);
    }

    onLayoutTap(args) {
        const message = "Tap on Layout for item: " + (args.object.bindingContext).id;
        console.log(message);
        // this.myListViewComponent.listView.notifySwipeToExecuteFinished();
        // let lbl = <Label>topmost().getViewById("lbl");
        // lbl.text += " \n" + message;
    }

}
