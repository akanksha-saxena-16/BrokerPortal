import { NgModule } from '@angular/core';
import { SharedModule } from '../BP.Shared/shared.module';
import {
  DashboardComponent,
  AllQuotesComponent,
  WrittenCommComponent,
  AllQuoteCommComponent,
  LeadsBreakdownComponent,
  CommBreakdownComponent,
  SigninComponent,
  UserCreateComponent,
  UserModifyComponent,
  UserSearchComponent,
  UserComponent
} from '../BP.Component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    AllQuotesComponent,
    WrittenCommComponent,
    AllQuoteCommComponent,
    LeadsBreakdownComponent,
    CommBreakdownComponent,
    SigninComponent,
    UserComponent,
    UserCreateComponent,
    UserModifyComponent,
    UserSearchComponent,
  ],
  exports: [
    //DashboardComponent,
    //UserComponent
  ]
})
export class ComponentModule { }
