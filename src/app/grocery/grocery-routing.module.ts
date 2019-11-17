import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GroceryListComponent } from "~/app/grocery/components/grocery-list/grocery-list.component";
import { GroceryComponent } from "~/app/grocery/components/grocery/grocery.component";

const routes: Routes = [
    {path: "", component: GroceryListComponent},
    {path: ":id", component: GroceryComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GroceryRoutingModule {
}
