import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { GamedetailsService } from './gamedetails.service';
import { Router } from '@angular/router';
import { IGame } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  constructor(private service: APIService, private detail: GamedetailsService, private router: Router) { }

  async goToDetails(gameIn: IGame) {
    await this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
      this.service.getGameScreenshots(gameIn.id).subscribe(screenshots =>{
        this.detail.clearScreenshots();
        this.detail.pushScreenshots(screenshots.results);
        console.log("screenshots set")
        this.router.navigate(['details2'])
        console.log("routed")
      })
    })
  }
}
