import { Injectable } from '@angular/core';
import { IGame, IScreenshot } from './app.module';
import { APIService } from './api.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GamedetailsService {

  private currentGame: IGame;
  private currentScreenshots: IScreenshot[] = [];

  constructor(private api: APIService) { 

  }

  setGame(gameIn: IGame){
    this.currentGame = gameIn;
  }

  getGame() : IGame{
    return this.currentGame;
  }

  clearScreenshots(){
    this.currentScreenshots = []
  }

  pushScreenshots(screenshotsIn: IScreenshot[]){
    this.currentScreenshots = screenshotsIn;
  }

  getScreenshots() : IScreenshot[] {
    return this.currentScreenshots;
  }



}
