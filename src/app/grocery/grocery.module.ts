import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { GroceryRoutingModule } from './grocery-routing.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { GroceryComponent } from './components/grocery/grocery.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { GroceryListContainerComponent } from './containers/grocery-list-container/grocery-list-container.component';
import { GroceryContainerComponent } from './containers/grocery-container/grocery-container.component';
import { GroceryListResolver } from '~/app/grocery/+state/resolvers/grocery-list.resolver';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { groceryFeatureKey, groceryReducer, initialState as groceryInitialState } from '~/app/grocery/+state/grocery.reducer';
import { GroceryEffects } from '~/app/grocery/+state/grocery.effects';
import { GroceryResolver } from '~/app/grocery/+state/resolvers/grocery.resolver';

@NgModule({
    imports: [NativeScriptCommonModule, GroceryRoutingModule, NativeScriptUIListViewModule,
        StoreModule.forFeature(groceryFeatureKey, groceryReducer, { initialState: groceryInitialState }),
        EffectsModule.forFeature([GroceryEffects])],
    declarations: [GroceryComponent, GroceryListComponent, GroceryListContainerComponent, GroceryContainerComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [GroceryListResolver, GroceryResolver]
})
export class GroceryModule {
}
