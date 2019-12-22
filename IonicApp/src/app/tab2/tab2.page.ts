import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';
import { IGame } from '../app.module';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  currentGames: IGame[] = [];

  constructor(private service: APIService, public toastController: ToastController,
    public loadingController: LoadingController) { }

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Game Found!',
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(query: String) {
    if (query != "") {
      const loading = await this.loadingController.create({
        message: 'Searching...',
        duration: 200,
        mode: "ios",
        spinner: "circular",
        translucent: false,
        animated: true
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();

      console.log('Loading dismissed!');
    }
  }

}

