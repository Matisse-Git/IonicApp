import { Component, OnInit } from '@angular/core';
import { GamedetailsService } from '../gamedetails.service';
import { IGame } from '../app.module';

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.scss'],
})
export class GamedetailsComponent implements OnInit {

  private currentGame: IGame;

  constructor(private detail: GamedetailsService) { }

  ngOnInit() {
    this.currentGame = this.detail.getGame();
  }

}
