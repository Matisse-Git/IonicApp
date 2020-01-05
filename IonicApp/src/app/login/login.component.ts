import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(private profile: ProfileService, private router: Router) { }

  ngOnInit() {}

  updateUsername(username: string){
    this.username = username;
  }
  updateEmail(email: string){
    this.email = email;
  }
  updatePassword(password: string){
    this.password = password;
  }
  async saveSettings(){
    this.profile.username = this.username;
    this.profile.email = this.email;
    this.profile.password = this.password;
    await this.profile.refreshAll();
    this.router.navigate(['tabs/tab1']);
  }



}
