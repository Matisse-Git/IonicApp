import { Component, OnInit } from '@angular/core';
import { GamedetailsService } from '../gamedetails.service';
import { IGame } from '../app.module';
import { ProfileService } from '../profile.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['./gamedetails.component.scss'],
})
export class GamedetailsComponent implements OnInit {

  private currentGame: IGame;
  statusOptions: String[] = [];
  currentStatus: String;
  wishlistButtonColor: string = 'white';
  showBackdrop: boolean;
  currentSegment: string = 'info';

  constructor(private detail: GamedetailsService, private profile: ProfileService, private messages: MessagesService) { }

  async ngOnInit() {
    this.presentToast('loading...', 1500)
    this.showBackdrop = true;
    this.currentGame = this.detail.getGame();
    await this.profile.refreshAll();
    this.currentGame = this.checkStatus(this.currentGame)
    console.log(this.currentGame)
    this.initializeOptions();
    this.showBackdrop = false;
  }

  checkStatus(gameIn: IGame){
    this.profile.currentBeaten.forEach(beaten => {
      if (gameIn.name == beaten.name){
        gameIn.completed = true;
        this.currentStatus = "beaten"
        }
    });
    this.profile.currentDropped.forEach(dropped => {
      if (gameIn.name == dropped.name){
        gameIn.dropped = true;
        this.currentStatus = "dropped"
      }
    });
    this.profile.currentPlaying.forEach(playing => {
      if (gameIn.name == playing.name){
        gameIn.playing = true;
        this.currentStatus = "playing"
      }
    });
    this.profile.currentYet.forEach(yet => {
      if (gameIn.name == yet.name){
        gameIn.yet = true;
        this.currentStatus = "yet"
      }
    });
    this.profile.currentToPlay.forEach(toplay => {
      if (gameIn.name == toplay.name){
        gameIn.onWishlist = true;
        this.wishlistButtonColor = 'success'
      }
    });
    return gameIn;
  }

  segmentChanged(ev: any) { 
    console.log('Segment changed', ev);
  }

  initializeOptions(){
    this.statusOptions.push("playing")
    this.statusOptions.push("dropped")
    this.statusOptions.push("beaten")
    this.statusOptions.push("yet")
  }

  async updateGameStatus(gameID: string, gameStatus: string){
    if(gameStatus == "toplay"){
      this.wishlistButtonColor = 'success'
    }
    await this.profile.updateGameStatus(gameID, gameStatus)
    console.log(gameID + "updated to" + status)
  }

  presentToast(message: string, duration: number){
    this.messages.presentToast(message, duration)
  }
}
