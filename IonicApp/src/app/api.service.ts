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

  searchGamesGenrePage(genre: String, page: number){
    console.log(`https://api.rawg.io/api/games?genres=${genre}&page=${page}`)
    return this.client.get<IResults>(`https://api.rawg.io/api/games?genres=${genre}&page=${page}`);
  }

  getGameDetailed(gameID: number){
    return this.client.get<IGame>("https://api.rawg.io/api/games/" + gameID);
  }

  searchGames(query: String){
    return this.client.get<IResults>("https://api.rawg.io/api/games?search=" + query);
  }
}





