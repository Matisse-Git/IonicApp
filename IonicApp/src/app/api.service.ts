import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';
import { IGame } from './app.module';


@Injectable({
  providedIn: 'root'
})


export class APIService {

  currentUser: IUser;

  constructor(private client:HttpClient) { }

  getUsersByPage(page: number){
    return this.client.get<IData>('https://reqres.in/api/users?page=' + page);
  }

  getGames(){
    return this.client.post<IGame>("https://api-v3.igdb.com/games", 'where name = "Monster Hunter: World";', { headers: new HttpHeaders().set("user-key", "4a0db999fca4a913efcf9f2dcf01388a")})
  }

  getUserById(id: number){
    console.log(id);
    return this.client.get<IDataSingle>('https://reqres.in/api/users/' + id);
  }

  displayEmail(userIn: IUser){
    this.currentUser = userIn;
  }

}

interface IData{
  data: IUser[];
}

interface IDataSingle{
  data: IUser;
}

interface IUser{
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}




