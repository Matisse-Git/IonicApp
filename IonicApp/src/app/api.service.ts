import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';
import { IGame, IResults, IScreenshotsResult } from './app.module';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})


export class APIService {

  constructor(private client:HttpClient, private datePipe: DatePipe) { }


  getMostAnticipatedGames(page: number){
    var today = Date.now();
    var todayString;
    todayString = this.datePipe.transform(today, 'yyyy-MM-dd');
    console.log(todayString);
    return this.client.get<IResults>("https://api.rawg.io/api/games?dates=" + todayString + ",2022-10-10&ordering=-added&page=" + page);
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
    return this.client.get<IScreenshotsResult>(`https://api.rawg.io/api/games/${gameID}/screenshots?page=1`)
  }

  searchGames(query: String){
    return this.client.get<IResults>("https://api.rawg.io/api/games?search=" + query);
  }
}





