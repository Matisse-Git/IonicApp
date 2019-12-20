import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class APIService {

  currentUser: String;

  constructor(private client:HttpClient) { }

  getUsers(){
    return this.client.get<IData>('https://reqres.in/api/users')
  }

  displayEmail(emailIn: String){
    this.currentUser = emailIn;
  }

}

interface IData{
  data: IUser[];
}

interface IUser{
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}
