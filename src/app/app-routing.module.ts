import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MasterComponent } from './BP.Shared';
import { DashboardComponent, SigninComponent, UserComponent } from './BP.Component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'portal'
  },
  {
    path: 'portal',
    component: MasterComponent,
    children: [
      {
        path: '',
        component: UserComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
