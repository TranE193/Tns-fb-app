import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";
import { GroceryComponent } from "~/app/browse/grocery/grocery.component";

const routes: Routes = [
    {path: "groceries/:id", component: GroceryComponent},
    {path: "groceries", component: BrowseComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BrowseRoutingModule {
}
