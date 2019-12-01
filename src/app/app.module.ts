import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '~/environments/environment';
import { EffectsModule } from "@ngrx/effects";
import { RootEffects } from "~/app/+state/root.effects";
import { initialState as rootInitialState, rootReducer } from "~/app/+state/root.reducer";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        StoreModule.forRoot(rootReducer, {
            initialState: rootInitialState,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        EffectsModule.forRoot([RootEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
