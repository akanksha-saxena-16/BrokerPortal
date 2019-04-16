import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenResponse } from '../../BP.Shared.Model/token_response';
//import { SecurityService } from 'src/app/BP.Services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    //private userService: SecurityService
  ) {}

  currentUser: TokenResponse;

  ngOnInit() {
    // this.userService.currentUser.subscribe(
    //   (userData) => {
    //     this.currentUser = userData;
    //   }
    // );
  }

  logout() {
    //this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
