import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { IGame, IUser } from '../app.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProfileService } from '../profile.service';
import { GamedetailsService } from '../gamedetails.service';
var Rawger = require('rawger');
declare var require: any

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private service: APIService, private router: Router,private statusBar: StatusBar, 
    private profile: ProfileService, private detail: GamedetailsService) {
    this.statusBar.backgroundColorByHexString('#191919');
    this.statusBar.styleLightContent()
  }

  items = [1, 2, 3, 4, 5];

  currentPlaying: IGame[] = [];
  currentToPlay: IGame[] = [];
  currentBeaten: IGame[] = [];
  currentDropped: IGame[] = [];
  currentYet: IGame[] = [];
  currentCollections: IGame[] = [];
  currentProfile: IUser;
  nextToPlay: IGame[] = [];

  today: any;

  async ngOnInit(){
    await this.profile.refreshAll();
    this.currentProfile = await this.profile.getProfile()
    this.currentPlaying = this.profile.getPlaying()
    this.currentToPlay = this.profile.getToPlay() 
    this.currentBeaten  = this.profile.getBeaten()
    this.currentDropped = this.profile.getDropped()
    this.currentYet = this.profile.getYet()
    this.currentCollections = this.profile.getCollections()

    this.today = Date.now();
  }

  async doRefresh(event) {
    this.currentProfile = await this.profile.getProfile()
    this.currentPlaying = this.profile.getPlaying()
    this.currentToPlay = this.profile.getToPlay()
    this.currentBeaten  = this.profile.getBeaten()
    this.currentDropped = this.profile.getDropped()
    this.currentYet = this.profile.getYet()
    this.currentCollections = this.profile.getCollections()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  //W.I.P
  doReorder(ev: any) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.items);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.items = ev.detail.complete(this.items);

    // After complete is called the items will be in the new order
    console.log('After complete', this.items);
  }

  goToDetails(gameIn: IGame) {
    this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
      this.router.navigate(['details'])
      console.log("routed")
    })
  }

  goToMyReleases(){
    this.router.navigate(['myReleases'])
    console.log("routed")
  }


}