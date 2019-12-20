import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private client: HttpClient, private service: APIService) {}

  currentUser: IUser;

  ngOnInit(){}

  getUser(id: number){
    this.service.getUserById(id).subscribe(user =>{
      console.log(user);
      this.currentUser = user.data;
    })
  }
}

interface IUser{
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}
