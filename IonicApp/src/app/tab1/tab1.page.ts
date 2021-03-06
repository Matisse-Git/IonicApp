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
import { SettingsService } from '../settings.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

var Rawger = require('rawger');
declare var require: any

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private statusBar: StatusBar, private profile: ProfileService,
    private popoverController: PopoverController, private methods: MethodService, private settings: SettingsService,
    public modalController: ModalController, private admobFree: AdMobFree) {
    this.statusBar.hide()
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: "ca-app-pub-5455924738055540/3815089607",
      isTesting: false,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
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
    await this.settings.getSetting('autoplaySetting');
    await this.settings.getSetting('scShowSetting');
    await this.settings.getSetting('loggedInSetting');
    if (!this.settings.loggedIn){
      await this.presentModal();
    }
    this.initializeThings();


  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    await modal.present();
    const { data }  = await modal.onDidDismiss();
    console.log(data.dismissed)
    return data.dismissed;
  }

  async initializeThings(){
    console.log('start initialize')
      await this.profile.refreshAll();
      this.currentProfile = await this.profile.getProfile()
      this.currentPlaying = this.profile.getPlaying()
      this.currentToPlay = this.profile.getToPlay()
      this.currentBeaten = this.profile.getBeaten()
      this.currentDropped = this.profile.getDropped()
      this.currentYet = this.profile.getYet()
      this.currentCollections = this.profile.getCollections()

  }

  async doRefresh(event) {
    await this.profile.refreshAll();
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

  goToLogin() {
    this.router.navigate(['login'])
    console.log("routed")
  }

  goToMyReleases() {
    this.router.navigate(['myReleases'])
    console.log("routed")
  }

  async createPopover(ev) {
    const popover = await this.popoverController.create({
      component: LoginpopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
