import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Grocery } from '~/app/shared/models/grocery';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/core/view';
import { TextField } from 'tns-core-modules/ui/text-field';
import { User } from 'nativescript-plugin-firebase';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-grocery-list',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
    filter: string = '';
    isSelectionMode: boolean;
    isAllSelected: boolean;

    @Input() groceries: Grocery[];
    @Input() currentUser: User;
    @Output() logout = new EventEmitter();
    @Output() removeGrocery = new EventEmitter();
    @Output() removeSelectedGroceries = new EventEmitter();
    @ViewChild('myListView', { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    constructor(private router: RouterExtensions, private route: ActivatedRoute) {}

    filtering(item: Grocery): boolean { return !!item;};

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args.object;
        const rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onRightSwipeClick(args: ListViewEventData) {
        const item = args.object.bindingContext;
        this.removeGrocery.emit(item.id);
    }

    onFilterChange(args) {
        const filterText = (<TextField>args.object).text;
        this.filtering = (item: Grocery) => {
            return item && item.name.toLowerCase().includes(filterText.toLowerCase());
        };
    }

    getUpdateDateView(item): string {
        const date: Date = new Date(item.updatedAt);
        return date.toLocaleString().substr(4, 20);
    }

    onLogout() {
        this.logout.emit();
    }

    public onItemSelected(args: ListViewEventData) {
        this.isSelectionMode = true;

        const listView = args.object as RadListView;
        const selectedGroceries = listView.getSelectedItems() as Grocery[];
        this.isAllSelected = selectedGroceries.length === this.groceries.length;
    }

    onItemDeselected(args: ListViewEventData) {
        const listView = args.object as RadListView;
        const selectedGroceries = listView.getSelectedItems() as Grocery[];
        this.isAllSelected = selectedGroceries.length === this.groceries.length;
    }

    onSelectAll() {
        !this.isAllSelected ? this.myListViewComponent.listView.selectAll() :
            this.myListViewComponent.listView.deselectAll();
    }

    onCloseSelectMenu() {
        this.myListViewComponent.listView.deselectAll();
        this.isSelectionMode = false;
    }

    onDeleteSelected() {
        const selectedGroceries = this.myListViewComponent.listView.getSelectedItems() as Grocery[];
        this.removeSelectedGroceries.emit(selectedGroceries.map(g => g.id));
        this.isSelectionMode = false;
    }

    onLongPressItem(item: Grocery) {
        this.myListViewComponent.listView.selectItemAt(this.groceries.indexOf(item));
    }

    onTapItem(item: Grocery) {
        if(!this.isSelectionMode) {
            this.router.navigateByUrl(this.router.router.createUrlTree([item.id], { relativeTo: this.route }));
        } else {
            const selectedGroceries = this.myListViewComponent.listView.getSelectedItems() as Grocery[];
            selectedGroceries.find(g => g.id === item.id) ?
                this.myListViewComponent.listView.deselectItemAt(this.groceries.indexOf(item)) :
                this.myListViewComponent.listView.selectItemAt(this.groceries.indexOf(item));
        }
    }
}
