import { Component, OnInit } from '@angular/core';
import { GamedetailsService } from '../gamedetails.service';
import { IGame } from '../app.module';

@Component({
  selector: 'app-searchpress',
  templateUrl: './searchpress.component.html',
  styleUrls: ['./searchpress.component.scss'],
})
export class SearchpressComponent implements OnInit {

  constructor(private details: GamedetailsService) { }

  currentGame : IGame;

  ngOnInit() {
    this.currentGame = this.details.getGame();
  }

}
