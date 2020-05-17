import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LayoutComponent } from '~/app/shared/components/layout/layout.component';


@NgModule({
    declarations: [LayoutComponent], imports: [LayoutRoutingModule, NativeScriptCommonModule], schemas: [NO_ERRORS_SCHEMA]
})
export class LayoutModule {}
