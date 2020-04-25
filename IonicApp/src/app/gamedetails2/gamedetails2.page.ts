import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { GamedetailsService } from '../gamedetails.service';
import { ProfileService } from '../profile.service';
import { MessagesService } from '../messages.service';
import { IScreenshot, IGame } from '../app.module';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-gamedetails2',
  templateUrl: './gamedetails2.page.html',
  styleUrls: ['./gamedetails2.page.scss'],
})
export class Gamedetails2Page implements OnInit {
  public currentGame: IGame;
  public currentScreenshots: IScreenshot[];
  public statusOptions: String[] = [];
  public currentStatus: String;
  public wishlistButtonColor: string = 'white';
  public showBackdrop: boolean;
  public currentSegment: string = 'info';
  public info: boolean = true;
  public description: String;
  public show2: boolean = false;
  public showMoreText: String = "Show Less";
  public youtubeLink: string;
  public scShow: boolean;
  public autoplay: boolean;
  public showMoreButton: boolean;


  constructor(private detail: GamedetailsService, private profile: ProfileService, private messages: MessagesService,
    private api: APIService, private videoPlayer: VideoPlayer, public actionSheetController: ActionSheetController
    , private settings: SettingsService) { }

  async ngOnInit() {
    this.showBackdrop = true;
    this.scShow = this.settings.scShow;
    console.log(this.scShow)
    this.autoplay = this.settings.autoplay;
    console.log(this.autoplay)
    this.initializeOptions();
    if (this.detail.getScreenshots() != null && this.detail.getGame() != null) {
      this.currentGame = await this.detail.getGame();
      this.currentGame = this.checkStatus(this.currentGame)
      this.currentScreenshots = this.detail.getScreenshots();
      this.showMore();
      if (this.currentGame.clip != null){
        this.youtubeLink = 'https://www.youtube.com/watch?v=' + this.currentGame.clip.video;
      }
      console.log(this.currentGame)
      console.log(this.currentScreenshots)
      console.log(this.currentGame.platforms.length)
    }

    //delete start here
    else {
      this.api.getGameDetailed(9767).subscribe(game => {
        this.currentGame = game;
        this.showMore();
        this.youtubeLink = 'https://www.youtube.com/watch?v=' + this.currentGame.clip.video;
        console.log(this.currentGame)
        console.log(this.currentScreenshots)
        console.log(this.currentGame.platforms.length)
      })
      this.api.getGameScreenshots(9767).subscribe(screenshots => {
        this.currentScreenshots = screenshots.results;
      })
    }
    //delete stop here

    this.showBackdrop = false;
  }

  showMore(){
    if (this.showMoreText == "Show More"){
      console.log("Show More Clicked")
      this.description = this.currentGame.description;
      this.showMoreText = "Show Less"
      this.showMoreButton = true;
    }
    else if (this.showMoreText == "Show Less"){
      console.log("Show Less Clicked")
      if (this.currentGame.description.length >= 250){
        console.log("enough characters ->" + this.currentGame.description.length.toString())
        this.description = this.currentGame.description.slice(0,250) + "...";
        this.showMoreText = "Show More"
        this.showMoreButton = true;
      }
      else{
        console.log("not enough characters in description ->" + this.currentGame.description.length.toString())
        this.description = this.currentGame.description;
        this.showMoreButton = false;
      }
    }
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: "ios",
      header: 'Select Status',
      buttons: [{
        text: 'Completed',
        icon: 'checkbox-outline',
        handler: () => {
          this.profile.updateGameStatus(this.currentGame.id.toString(), 'beaten')
          this.messages.presentToast(`${this.currentGame.name} updated to 'Completed'!`, 2000)
        }
      }, {
        text: 'Playing',
        icon: 'play',
        handler: () => {
          this.profile.updateGameStatus(this.currentGame.id.toString(), 'playing')
          this.messages.presentToast(`${this.currentGame.name} updated to 'Playing'!`, 2000)
        }
      }, {
        text: 'Yet To Play',
        icon: 'clock',
        handler: () => {
          this.profile.updateGameStatus(this.currentGame.id.toString(), 'yet')
          this.messages.presentToast(`${this.currentGame.name} updated to 'Yet To Play'!`, 2000)
        }
      }, {
        text: 'Dropped',
        icon: 'close',
        handler: () => {
          this.profile.updateGameStatus(this.currentGame.id.toString(), 'dropped')
          this.messages.presentToast(`${this.currentGame.name} updated to 'Dropped'!`, 2000)
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  playVideo() {
    console.log(this.currentGame.clip.clip)
    this.videoPlayer.play(this.currentGame.clip.clip).then(() => {
      console.log('video completed');
    })
  }

  show() {
    console.log("image loaded")
    this.show2 = true;
  }

  checkStatus(gameIn: IGame) {
    this.profile.currentBeaten.forEach(beaten => {
      if (gameIn.name == beaten.name) {
        gameIn.completed = true;
        this.currentStatus = "Completed"
      }
    });
    this.profile.currentDropped.forEach(dropped => {
      if (gameIn.name == dropped.name) {
        gameIn.dropped = true;
        this.currentStatus = "Dropped"
      }
    });
    this.profile.currentPlaying.forEach(playing => {
      if (gameIn.name == playing.name) {
        gameIn.playing = true;
        this.currentStatus = "Currently Playing"
      }
    });
    this.profile.currentYet.forEach(yet => {
      if (gameIn.name == yet.name) {
        gameIn.yet = true;
        this.currentStatus = "Yet To Play"
      }
    });
    this.profile.currentToPlay.forEach(toplay => {
      if (gameIn.name == toplay.name) {
        gameIn.onWishlist = true;
        this.wishlistButtonColor = 'success'
      }
    });
    return gameIn;
  }

  initializeOptions() {
    this.statusOptions.push("playing")
    this.statusOptions.push("dropped")
    this.statusOptions.push("beaten")
    this.statusOptions.push("yet")
  }

  changeSegment(segmentValue: String) {

  }

  async updateGameStatus(gameID: number, gameStatus: string) {
    if (gameStatus == "toplay") {
      this.wishlistButtonColor = 'success'
      await this.profile.updateGameStatus(gameID.toString(), 'toplay')
    }
    else {
      await this.profile.updateGameStatus(gameID.toString(), gameStatus)
    }
    console.log(gameID.toString() + " updated to " + gameStatus.toString())
    this.profile.refreshAll();
  }

  presentToast(message: string, duration: number) {
    this.messages.presentToast(message, duration)
  }
}

