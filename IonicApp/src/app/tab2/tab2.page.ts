import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';
import { IGame } from '../app.module';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GamedetailsService } from '../gamedetails.service';
import { PopoverController } from '@ionic/angular';
import { MessagesService } from '../messages.service';
import { SearchpressComponent } from '../searchpress/searchpress.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  currentGames: IGame[] = [];
  skeletonItems: String[] = [];
  skeleton: boolean;

  constructor(private service: APIService, public toastController: ToastController,
    public loadingController: LoadingController, private router: Router, private detail: GamedetailsService
    , public popoverController: PopoverController, private messages: MessagesService) { }

  ngOnInit() { }

  getGameById(query: String) {
    this.currentGames = [];
    if (query != '') {
      this.service.searchGames(query).subscribe(games => {
        games.results.forEach(element => {
          element.platforms.forEach(platforms => {
            if (platforms.platform.name == "PC"){
              console.log(element.name + " --> PC")
              element.windows = true;
            }
            if (platforms.platform.name == "PlayStation 4"){
              console.log(element.name + " --> PS4")
              element.playstation = true;
            }
            if (platforms.platform.name == "Xbox One"){
              console.log(element.name + " --> XBOX")
              element.xbox = true;
            }
            if (platforms.platform.name == "Nintendo Switch"){
              console.log(element.name + " --> SWITCH")
              element.switch = true;
            }
          });
          this.currentGames.push(element);
        });
        this.skeleton = false;
        if (this.currentGames.length == 0 && query != '') {
          this.messages.presentToast('No Games Found...', 2000)
        }

      })
    }

  }

  showSkeleton(query: String) {
    console.log("key pressed")
    if (query != '') {
      for (let index = 0; index < 15; index++) {
        if (this.skeletonItems.length < 15) {
          this.skeletonItems.push("")
        }
      }
      this.skeleton = true;
    }
    else{
      this.skeleton = false;
    }
  }

  async presentPopover(ev: any, gameIn: IGame) {
    this.detail.setGame(gameIn);
    console.log("longpressed")
    const popover = await this.popoverController.create({
      component: SearchpressComponent,
      event: ev,
      translucent: true,
      mode: "ios"
    });
    return await popover.present();

  }

  clearInput(event) {
    event.target.value = '';
  }

  goToDetails(gameIn: IGame) {
    this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
    })
    this.service.getGameScreenshots(gameIn.id).subscribe(screenshots =>{
      this.detail.clearScreenshots();
      this.detail.pushScreenshots(screenshots.results);
      console.log("screenshots set")
      this.router.navigate(['details'])
      console.log("routed")
    })
  }


}

