import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';
import { IGame, IResults, IScreenshotsResult } from './app.module';


@Injectable({
  providedIn: 'root'
})


export class APIService {

  constructor(private client:HttpClient) { }


  getMostAnticipatedGames(page: number){
    return this.client.get<IResults>("https://api.rawg.io/api/games?dates=2020-01-01,2022-10-10&ordering=-added&page=" + page);
  }

  getGames(){
    return this.client.get<IResults>("https://api.rawg.io/api/games");
  }

  getYearlyPopularGames(year: String, page: number){
    return this.client.get<IResults>(`https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&page=${page}&ordering=-added`)
  }

  searchGamesGenrePage(genre: String, page: number, ordering: String){
    console.log(`https://api.rawg.io/api/games?genres=${genre}&page=${page}`)
    return this.client.get<IResults>(`https://api.rawg.io/api/games?genres=${genre}&page=${page}&ordering=${ordering}`);
  }

  getGameDetailed(gameID: number){
    return this.client.get<IGame>("https://api.rawg.io/api/games/" + gameID);
  }

  getGameScreenshots(gameID: number){
    return this.client.get<IScreenshotsResult>(`https://api.rawg.io/api/games/${gameID}/screenshots`)
  }

  searchGames(query: String){
    return this.client.get<IResults>("https://api.rawg.io/api/games?search=" + query);
  }
}





