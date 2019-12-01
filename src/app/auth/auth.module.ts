import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { AuthRoutingModule } from "~/app/auth/auth-routing.module";
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';
import { StoreModule } from "@ngrx/store";
import { authFeatureKey, authReducer, initialState as authInitialState } from "~/app/auth/+state/auth.reducer";
import { AuthResolver } from "~/app/auth/+state/resolvers/auth.resolver";


@NgModule({
    declarations: [LoginComponent, LoginContainerComponent],
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        StoreModule.forFeature(authFeatureKey, authReducer, {initialState: authInitialState}),
        EffectsModule.forFeature([AuthEffects])
    ],
    providers: [AuthResolver],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
