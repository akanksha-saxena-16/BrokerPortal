import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { ApiService, ApiOperationResult, TokenResponse, JwtService } from 'src/app/BP.Shared';
import { UserDTO, AuthDTO } from '../../BP.Models';

@Injectable()
export class SecurityService {
  private currentUserSubject = new BehaviorSubject<TokenResponse>({} as TokenResponse);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private http: HttpClient,
  ) { }

  setAuth(response: TokenResponse) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(response.access_token);
    // Set current user data into observable
    this.currentUserSubject.next(response);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as TokenResponse);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials: AuthDTO): Observable<TokenResponse> {
    const route = '/Login/PostData';
    console.log(credentials);
    return this.apiService.post(route, credentials)
      .pipe(map(
        res => {
          console.log(res)
          if (res.status === true) {
            this.setAuth(res.data);
          }
          else {
            throw new Error(res.Exception);
          }
          return res.data;
        }
      ));
  }
}
