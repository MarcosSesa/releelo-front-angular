import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {
    path: 'login',
    data: {isNewUser: false},
    component: AuthComponent
  },
  {
    path: 'register',
    data: {isNewUser: true},
    component: AuthComponent
  },
  {
    path: '',
    data: {isNewUser: false},
    component: AuthComponent
  },
  {
    path: '**',
    loadChildren: () => import('../not-found/not-found.module').then((m) => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
