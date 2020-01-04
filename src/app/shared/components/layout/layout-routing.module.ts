import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule, NSEmptyOutletComponent } from 'nativescript-angular/router';
import { LayoutComponent } from '~/app/shared/components/layout/layout.component';


const routes: Routes = [{
    path: '', redirectTo: '/tabs/(groceryOutlet:groceries//searchTab:search)', pathMatch: 'full'
}, {
    path: 'tabs', component: LayoutComponent, children: [{
        path: 'groceries',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/grocery/grocery.module').then((m) => m.GroceryModule),
        outlet: 'groceryOutlet'
    }, {
        path: 'search',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
        outlet: 'searchTab'
    }]
}];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)], exports: [NativeScriptRouterModule]
})
export class LayoutRoutingModule {}
