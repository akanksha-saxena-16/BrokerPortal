import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { 
  ApiService, 
  UtilsService,
  JwtService 
} from '../BP.Shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './BP.Shared.Interceptors/http.token.interceptor';
import {
  HeaderComponent, 
  FooterComponent,
  MasterComponent,
  SidebarMainComponent,
  AlertComponent,
  ConfirmationComponent,
  ListErrorsComponent
} from '../BP.Shared/BP.Shared.Component';
import { ModalModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule.forRoot({ container: document.body }),
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent,
    MasterComponent,
    SidebarMainComponent,
    AlertComponent,
    ConfirmationComponent,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent, 
    FooterComponent,
    MasterComponent,
    SidebarMainComponent,
    AlertComponent,
    ConfirmationComponent,
    ListErrorsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UtilsService,
    JwtService
  ],
})
export class SharedModule {}
