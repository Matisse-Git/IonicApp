import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpopover',
  templateUrl: './loginpopover.component.html',
  styleUrls: ['./loginpopover.component.scss'],
})
export class LoginpopoverComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToLogin(){
    this.router.navigate(['login'])
    console.log("routed")
  }
}
