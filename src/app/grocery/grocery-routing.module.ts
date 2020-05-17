import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { GroceryListContainerComponent } from '~/app/grocery/containers/grocery-list-container/grocery-list-container.component';
import { GroceryContainerComponent } from '~/app/grocery/containers/grocery-container/grocery-container.component';
import { GroceryListResolver } from '~/app/grocery/+state/resolvers/grocery-list.resolver';
import { GroceryResolver } from '~/app/grocery/+state/resolvers/grocery.resolver';

const routes: Routes = [{
    path: '', component: GroceryListContainerComponent, resolve: [GroceryListResolver]
}, {
    path: ':id', component: GroceryContainerComponent, resolve: [GroceryResolver]
}];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)], exports: [NativeScriptRouterModule]
})
export class GroceryRoutingModule {
}
