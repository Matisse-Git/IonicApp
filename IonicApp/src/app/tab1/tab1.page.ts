import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private client: HttpClient, private service: APIService, private router: Router) {}

  Users : IUser[] = [];
  currentPage: number = 1;

  ngOnInit(){
    this.service.getUsersByPage(this.currentPage).subscribe(users =>{
      users.data.forEach(user => {
        this.Users.push(user);
      });
    })
  }

  getUsersPage(page: number){
    this.currentPage = page;
    this.service.getUsersByPage(this.currentPage).subscribe(users =>{
        this.Users = users.data;
    })
  }

  test(user: IUser){
    this.router.navigate(['/tabs/tab3'])
    this.service.displayEmail(user);
  }

}

interface IUser{
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}
