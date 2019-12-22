import { Injectable } from '@angular/core';
import { IGame } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class GamedetailsService {

  private currentGame: IGame;

  constructor() { }

  setGame(gameIn: IGame){
    this.currentGame = gameIn;
  }

  getGame() : IGame{
    return this.currentGame;
  }
}
