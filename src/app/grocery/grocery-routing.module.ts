import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { GroceryListContainerComponent } from '~/app/grocery/containers/grocery-list-container/grocery-list-container.component';
import { GroceryContainerComponent } from '~/app/grocery/containers/grocery-container/grocery-container.component';

const routes: Routes = [{ path: '', component: GroceryListContainerComponent }, {
    path: ':id', component: GroceryContainerComponent
}];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)], exports: [NativeScriptRouterModule]
})
export class GroceryRoutingModule {
}
