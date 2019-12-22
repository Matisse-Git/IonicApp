import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';
import { IGame, IResults } from './app.module';


@Injectable({
  providedIn: 'root'
})


export class APIService {

  constructor(private client:HttpClient) { }


  getGames(){
    return this.client.get<IResults>("https://api.rawg.io/api/games");
  }

  searchGames(query: String){
    return this.client.get<IResults>("https://api.rawg.io/api/games?search=" + query);
  }
}





