import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { AuthRoutingModule } from "~/app/auth/auth-routing.module";


@NgModule({
    declarations: [LoginComponent, LoginContainerComponent],
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
