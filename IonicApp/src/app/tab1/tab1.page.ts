import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { IGame, IUser } from '../app.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProfileService } from '../profile.service';
var Rawger = require('rawger');
declare var require: any

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private client: HttpClient, private service: APIService, private router: Router,
    private statusBar: StatusBar, private profile: ProfileService) {
    this.statusBar.hide();
  }

  currentPlaying: IGame[] = [];
  currentToPlay: IGame[] = [];
  currentBeaten: IGame[] = [];
  currentDropped: IGame[] = [];
  currentYet: IGame[] = [];
  currentCollections: IGame[] = [];
  currentProfile: IUser;

  async ngOnInit(){
    var rawger = await Rawger({
      email: 'matttske@gmail.com',
      password: 'Simbaenkiara<3'
    });
    var { users } = rawger;

    this.currentProfile = (await users('matttske').profile()).get();
    this.currentPlaying = (await users('Matttske').games('playing')).raw()
    this.currentToPlay = (await users('Matttske').games('toplay')).raw()
    this.currentBeaten  = (await users('Matttske').games('beaten ')).raw()
    this.currentDropped = (await users('Matttske').games('dropped')).raw()
    this.currentYet = (await users('Matttske').games('yet ')).raw()
    this.currentCollections = (await users('Matttske').collections()).raw()
  }

}