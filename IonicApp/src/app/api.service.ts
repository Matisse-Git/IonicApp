import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularDelegate } from '@ionic/angular';
import { IGame, IResults, IScreenshotsResult } from './app.module';
import { DatePipe } from '@angular/common';
import { UserAgent } from '@ionic-native/user-agent/ngx';

@Injectable({
  providedIn: 'root'
})


export class APIService {

  constructor(private client:HttpClient, private datePipe: DatePipe, private userAgent: UserAgent) { }

  headers = new HttpHeaders({
    "User-Agent": "Rawg.io Unofficial Gamelist/1.0"
  });

  getMostAnticipatedGames(page: number){
    var today = Date.now();
    var todayString;
    todayString = this.datePipe.transform(today, 'yyyy-MM-dd');
    console.log(todayString);
    return this.client.get<IResults>("https://api.rawg.io/api/games?dates=" + todayString + ",2022-10-10&ordering=-added&page=" + page,  {
      headers: this.headers
    });
  }

  getGames(){
    return this.client.get<IResults>("https://api.rawg.io/api/games",  {
      headers: this.headers
    });
  }

  getYearlyPopularGames(year: String, page: number){
    return this.client.get<IResults>(`https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&page=${page}&ordering=-added`,  {
      headers: this.headers
    });
  }

  searchGamesGenrePage(genre: String, page: number, ordering: String){
    console.log(`https://api.rawg.io/api/games?genres=${genre}&page=${page}`)
    return this.client.get<IResults>(`https://api.rawg.io/api/games?genres=${genre}&page=${page}&ordering=${ordering}`,  {
      headers: this.headers
    });
  }

  getGameDetailed(gameID: number){
    return this.client.get<IGame>("https://api.rawg.io/api/games/" + gameID,  {
      headers: this.headers
    });
  }

  getGameScreenshots(gameID: number){
    return this.client.get<IScreenshotsResult>(`https://api.rawg.io/api/games/${gameID}/screenshots?page=1`,  {
      headers: this.headers
    });
  }

  searchGames(query: String){
    return this.client.get<IResults>("https://api.rawg.io/api/games?search=" + query,  {
      headers: this.headers
    });
  }

  setUserAgent(){
    this.userAgent.set('Rawg.io Unofficial Gamelist/1.0')
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }
}





