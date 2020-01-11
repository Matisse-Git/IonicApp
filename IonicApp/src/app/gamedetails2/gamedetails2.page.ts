import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { GamedetailsService } from '../gamedetails.service';
import { ProfileService } from '../profile.service';
import { MessagesService } from '../messages.service';
import { IScreenshot, IGame } from '../app.module';

@Component({
  selector: 'app-gamedetails2',
  templateUrl: './gamedetails2.page.html',
  styleUrls: ['./gamedetails2.page.scss'],
})
export class Gamedetails2Page implements OnInit {
  private currentGame: IGame;
  private currentScreenshots: IScreenshot[];
  statusOptions: String[] = [];
  currentStatus: String = "ADD";
  wishlistButtonColor: string = 'white';
  showBackdrop: boolean;
  currentSegment: string = 'info';
  info: boolean = true;
  description: boolean = false;

  constructor(private detail: GamedetailsService, private profile: ProfileService, private messages: MessagesService,
  private api: APIService) { }

  async ngOnInit() {
    this.showBackdrop = true;
    this.initializeOptions();
    if (this.detail.getScreenshots() != null && this.detail.getGame() != null){
      this.currentGame = await this.detail.getGame();
      this.currentGame = this.checkStatus(this.currentGame)
      this.currentScreenshots = this.detail.getScreenshots();
      console.log(this.currentGame)
      console.log(this.currentScreenshots)
      console.log(this.currentGame.platforms.length)
    }
    else{
      this.api.getGameDetailed(9767).subscribe(game =>{
        this.currentGame = game;
        console.log(this.currentGame)
        console.log(this.currentScreenshots)
        console.log(this.currentGame.platforms.length)
      })
      this.api.getGameScreenshots(9767).subscribe(screenshots =>{
        this.currentScreenshots = screenshots.results;
      })
      this.currentStatus = "ADD"
    }
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

  segmentChanged(ev: any, segmentValue: String) { 
    if (segmentValue == "info"){
      this.info = true;
      this.description = false;
    }
    if (segmentValue == "description"){
      this.info = false;
      this.description = true;
    }
    console.log('Segment changed', ev);
    console.log(segmentValue)
  }

  initializeOptions(){
    this.statusOptions.push("playing")
    this.statusOptions.push("dropped")
    this.statusOptions.push("beaten")
    this.statusOptions.push("yet")
  }

  changeSegment(segmentValue: String){

  }

  async updateGameStatus(gameID: string, gameStatus: string){
    if(gameStatus == "toplay"){
      this.wishlistButtonColor = 'success'
      await this.profile.updateGameStatus(gameID, 'toplay')
    }
    else {
      await this.profile.updateGameStatus(gameID, gameStatus)
    }
    console.log(gameID.toString() + " updated to " + gameStatus.toString())
    this.profile.refreshAll();
  }

  presentToast(message: string, duration: number){
    this.messages.presentToast(message, duration)
  }
}

