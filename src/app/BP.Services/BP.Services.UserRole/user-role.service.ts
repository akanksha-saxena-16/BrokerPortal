import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ApiService, ApiOperationResult } from 'src/app/BP.Shared';
import { UserRoleVM } from '../../BP.Models';

@Injectable()
export class UserRoleService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  getActiveRoleList(): Observable<UserRoleVM[]> {
    const route = '/RoleAccess/GetActiveRoleList';
    return this.apiService.get(route)
      .pipe(map(data => data));
  }
}
