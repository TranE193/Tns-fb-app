import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RootResolver } from "~/app/+state/resolvers/root.resolver";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(groceryTab:groceries//searchTab:search/default)",
        pathMatch: "full"
    },
    {
        path: "groceries",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/grocery/grocery.module").then((m) => m.GroceryModule),
        outlet: "groceryTab",
        resolve: {root: RootResolver}
    },
    {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab",
        // resolve: {root: RootResolver} todo: seems to lazy load isn`t working :(
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
