import { NgModule } from '@angular/core';
import { SharedModule } from '../BP.Shared/shared.module';
import { UserService } from './BP.Services.User/user.service';
import { UserRoleService } from './BP.Services.UserRole/user-role.service';
import { SecurityService } from './BP.Services.Security/security.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    UserService,
    UserRoleService,
    SecurityService
  ]
})
export class ServiceModule { }
