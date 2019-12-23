import { Component, OnInit } from '@angular/core';
import { GamedetailsService } from '../gamedetails.service';
import { IGame } from '../app.module';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-searchpress',
  templateUrl: './searchpress.component.html',
  styleUrls: ['./searchpress.component.scss'],
})
export class SearchpressComponent implements OnInit {

  constructor(private details: GamedetailsService) { }

  currentGame : IGame;
  good : boolean;
  meh : boolean;
  bad : boolean;

  ngOnInit() {
    this.currentGame = this.details.getGame();
    if (this.currentGame.metacritic > 70){
      this.good = true;
      this.meh = false;
      this.bad = false;
    }
    else if (this.currentGame.metacritic >= 50){
      this.good = false;
      this.meh = true;
      this.bad = false;
    }
    else if (this.currentGame.metacritic < 50){
      this.good = false;
      this.meh = false;
      this.bad = true;
    }
  }

}
