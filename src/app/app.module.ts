import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '~/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RootEffects } from '~/app/+state/root.effects';
import { initialState as rootInitialState, rootReducer } from '~/app/+state/root.reducer';
import { RootResolver } from '~/app/+state/resolvers/root.resolver';
import { AuthModule } from '~/app/auth/auth.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, StoreModule.forRoot({ root: rootReducer }, {
        initialState: { root: rootInitialState }, runtimeChecks: {
            strictStateImmutability: true, strictActionImmutability: true
        }
    }), EffectsModule.forRoot([RootEffects]), !environment.production ? StoreDevtoolsModule.instrument() : [],
        AuthModule],
    providers: [RootResolver],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
