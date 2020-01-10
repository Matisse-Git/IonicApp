import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { IGame, IUser } from '../app.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProfileService } from '../profile.service';
import { GamedetailsService } from '../gamedetails.service';
import { MessagesService } from '../messages.service';
import { PopoverController } from '@ionic/angular';
import { LoginpopoverComponent } from '../loginpopover/loginpopover.component';
import { MethodService } from '../method.service';
var Rawger = require('rawger');
declare var require: any

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private statusBar: StatusBar, private profile: ProfileService, 
  private popoverController: PopoverController, private methods: MethodService) {
    this.statusBar.hide()
  }

  currentPlaying: IGame[] = [];
  currentToPlay: IGame[] = [];
  currentBeaten: IGame[] = [];
  currentDropped: IGame[] = [];
  currentYet: IGame[] = [];
  currentCollections: IGame[] = [];
  currentProfile: IUser;
  nextToPlay: IGame[] = [];

  today: any;

  async ngOnInit() {
    if (this.profile.username != null) {
      await this.profile.refreshAll();
      this.currentProfile = await this.profile.getProfile()
      this.currentPlaying = this.profile.getPlaying()
      this.currentToPlay = this.profile.getToPlay()
      this.currentBeaten = this.profile.getBeaten()
      this.currentDropped = this.profile.getDropped()
      this.currentYet = this.profile.getYet()
      this.currentCollections = this.profile.getCollections()
    }
  }

  async doRefresh(event) {
    this.currentProfile = await this.profile.getProfile()
    this.currentPlaying = this.profile.getPlaying()
    this.currentToPlay = this.profile.getToPlay()
    this.currentBeaten = this.profile.getBeaten()
    this.currentDropped = this.profile.getDropped()
    this.currentYet = this.profile.getYet()
    this.currentCollections = this.profile.getCollections()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  async goToDetails(gameIn: IGame) {
    this.methods.goToDetails(gameIn);
  }

  goToLogin(){
    this.router.navigate(['login'])
    console.log("routed")
  }

  goToMyReleases() {
    this.router.navigate(['myReleases'])
    console.log("routed")
  }

  async createPopover(ev){
    const popover = await this.popoverController.create({
      component: LoginpopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}