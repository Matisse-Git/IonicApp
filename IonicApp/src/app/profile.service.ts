import { Injectable } from '@angular/core';
import { IUser, IGame } from './app.module';
var Rawger = require('rawger');
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentPlaying: IGame[] = [];
  currentToPlay: IGame[] = [];
  currentBeaten: IGame[] = [];
  currentDropped: IGame[] = [];
  currentYet: IGame[] = [];
  currentOwned: IGame[] = [];
  currentCollections: IGame[] = [];
  currentProfile: IUser;
  rawger: any;
  users: any;

  constructor() { }

  async ngOnInit(){
    this.rawger = await Rawger({
      email: 'matttske@gmail.com',
      password: 'Simbaenkiara<3'
    });
    var { users } = this.rawger;
    console.log(this.users)

    this.currentProfile = (await users('matttske').profile()).get();
    this.currentPlaying = (await users('Matttske').games('playing')).raw()
    this.currentToPlay = (await users('Matttske').games('toplay')).raw()
    this.currentBeaten  = (await users('Matttske').games('beaten ')).raw()
    this.currentDropped = (await users('Matttske').games('dropped')).raw()
    this.currentYet = (await users('Matttske').games('yet ')).raw()
    this.currentCollections = (await users('Matttske').collections()).raw()
  }

  
  async getProfile(){
    return this.currentProfile;
  }

  getPlaying(){
    return this.currentPlaying;
  }

  getToPlay(){
    return this.currentToPlay;
  }

  getBeaten(){
    return this.currentBeaten;
  }

  getDropped(){
    return this.currentDropped;
  }

  getYet(){
    return this.currentYet;
  }

  getCollections(){
    return this.currentCollections;
  }

  async refreshAll(){
    await this.refreshPlaying();
    await this.refreshToPlay();
    await this.refreshBeaten();
    await this.refreshDropped();
    await this.refreshYet();
    await this.refreshCollections();
  }

  async refreshPlaying(){
    var playing = (await this.users('Matttske').games('playing')).raw()
    this.currentPlaying = [];
    playing.forEach(element => {
      this.currentPlaying.push(element);
    });
  }

  async refreshToPlay(){
    var toplay = (await this.users('Matttske').games('toplay')).raw()
    this.currentToPlay = [];
    toplay.forEach(element => {
      this.currentToPlay.push(element);
    });
  }

  async refreshBeaten(){
    var beaten = (await this.users('Matttske').games('beaten')).raw()
    this.currentBeaten = [];
    beaten.forEach(element => {
      this.currentBeaten.push(element)
    });
  }

  async refreshDropped(){
    var dropped = (await this.users('Matttske').games('dropped')).raw()
    this.currentDropped = [];
    dropped.forEach(element => {
      this.currentDropped.push(element)
    });
  }

  async refreshYet(){
    var yet = (await this.users('Matttske').games('yet')).raw()
    this.currentYet = [];
    yet.forEach(element => {
      this.currentYet.push(element)
    });
  }

  async refreshCollections(){
    var collections = (await this.users('Matttske').games('collections')).raw()
    this.currentCollections = [];
    collections.forEach(element => {
      this.currentCollections.push(element)
    });

  }
}
