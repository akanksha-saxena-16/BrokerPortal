import { Component, OnInit } from '@angular/core';
import { UserVM } from 'src/app/BP.Models/BP.Models.ViewModel/user.vm';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: UserVM;

  ngOnInit(){
    // this.user.email = 'a@gmail.ocm';
    // console.log(this.user);
  }
}
