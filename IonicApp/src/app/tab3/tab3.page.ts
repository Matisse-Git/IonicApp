import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { ProfileService } from '../profile.service';
import { IGame, IResults } from '../app.module';
import { stringify } from 'querystring';
import { GamedetailsService } from '../gamedetails.service';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
var Rawger = require('rawger');

declare var require: any
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  autoplay: boolean;
  scShow: boolean;

  constructor(private settings: SettingsService) {}

  async ngOnInit() {
    await this.settings.getSetting('autoplaySetting');
    await this.settings.getSetting('scShowSetting');
    this.autoplay = this.settings.autoplay
    this.scShow = this.settings.scShow
    console.log(this.autoplay)
    console.log(this.scShow)
  }

  changeAutoplay(value: boolean){
    console.log(value)
    this.autoplay = value;
    this.settings.changeAutoplay(value)
  }

  changeSc(value: boolean){
    console.log(value)
    this.scShow = value;
    this.settings.changeSc(value)
  }

}