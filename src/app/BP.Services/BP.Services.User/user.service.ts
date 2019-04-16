import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ApiService, ApiOperationResult } from 'src/app/BP.Shared';
import { UserDTO } from '../../BP.Models';

@Injectable()
export class UserService {
 
  constructor (
    private apiService: ApiService,
    private http: HttpClient,
  ) {}

  createUser(user: UserDTO): Observable<any> {
    const route = '/User/CreateUserPost';
    return this.apiService.post(route, user)
      .pipe(map(res => res));
  }
}
