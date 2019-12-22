import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';
import { IGame } from '../app.module';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GamedetailsService } from '../gamedetails.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  currentGames: IGame[] = [];

  constructor(private service: APIService, public toastController: ToastController,
    public loadingController: LoadingController, private router: Router, private detail: GamedetailsService) { }

  ngOnInit() { }

  getGameById(query: String) {
    this.currentGames = [];
    if (query != '') {
      this.service.searchGames(query).subscribe(games => {
        games.results.forEach(element => {
          this.currentGames.push(element);
        });
      })
    }
  }

  clearInput(event){
    event.target.value = '';
  }

  goToDetails(gameIn: IGame){
    this.detail.setGame(gameIn);
    this.router.navigate(['details'])
  }
}

