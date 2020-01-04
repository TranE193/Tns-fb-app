import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthGuard } from '~/app/shared/guards/auth.guard';
import { LoginContainerComponent } from '~/app/auth/containers/login-container/login-container.component';
import { RootResolver } from '~/app/+state/resolvers/root.resolver';

const routes: Routes = [{
    path: 'login', component: LoginContainerComponent, resolve: [RootResolver]
}, {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('~/app/shared/components/layout/layout.module').then((m) => m.LayoutModule)
}];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)], exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
