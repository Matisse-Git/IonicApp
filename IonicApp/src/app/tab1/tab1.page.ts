import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { IGame, IUser } from '../app.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var Rawger = require('rawger');

declare var require: any
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private client: HttpClient, private service: APIService, private router: Router,
    private statusBar: StatusBar) {
    this.statusBar.hide();
  }

  currentPlaying: IGame[] = [];
  currentToPlay: IGame[] = [];
  currentBeaten: IGame[] = [];
  currentDropped: IGame[] = [];
  currentYet: IGame[] = [];
  currentOwned: IGame[] = [];
  currentCollections: IGame[] = [];
  currentProfile: IUser;


  async ngOnInit(){
    var rawger = await Rawger();
    var { users } = rawger;
    this.currentProfile = (await users('matttske').profile()).get();
    var playing = (await users('Matttske').games('playing')).raw()
    var toplay = (await users('Matttske').games('toplay')).raw()
    var beaten  = (await users('Matttske').games('beaten ')).raw()
    var dropped = (await users('Matttske').games('dropped')).raw()
    var yet = (await users('Matttske').games('yet ')).raw()
    var owned  = (await users('Matttske').games('owned ')).raw()
    var collections = (await users('Matttske').collections()).raw()

    playing.forEach(element => {
      this.currentPlaying.push(element);
    });

    toplay.forEach(element => {
      this.currentToPlay.push(element)
    });

    beaten.forEach(element => {
      this.currentBeaten.push(element)
    });

    dropped.forEach(element => {
      this.currentDropped.push(element)
    });

    yet.forEach(element => {
      this.currentYet.push(element)
    });

    owned.forEach(element => {
      this.currentOwned.push(element)
    });

    collections.forEach(element => {
      this.currentCollections.push(element)
    });


    /*console.log("playing ->")
    console.log(playing);
    console.log("toplay ->")
    console.log(toplay);
    console.log("beaten ->")
    console.log(beaten);
    console.log("dropped ->")
    console.log(dropped);
    console.log("yet ->")
    console.log(yet);
    console.log("owned ->")
    console.log(owned);
    console.log("collections ->")*/
    console.log(this.currentProfile)
  }

}