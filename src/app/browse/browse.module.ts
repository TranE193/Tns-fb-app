import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { GroceryComponent } from './grocery/grocery.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        BrowseComponent,
        GroceryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule {
}
