import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GroceryRoutingModule } from "./grocery-routing.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { GroceryComponent } from './components/grocery/grocery.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { GroceryListContainerComponent } from './containers/grocery-list-container/grocery-list-container.component';
import { GroceryContainerComponent } from './containers/grocery-container/grocery-container.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GroceryRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        GroceryComponent,
        GroceryListComponent,
        GroceryListContainerComponent,
        GroceryContainerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GroceryModule {
}
