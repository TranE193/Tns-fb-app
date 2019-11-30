import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginContainerComponent } from "~/app/auth/containers/login-container/login-container.component";

const routes: Routes = [
    {path: "", component: LoginContainerComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule {
}
