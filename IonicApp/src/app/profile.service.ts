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

  username: string = 'testWrapper';
  email: string = 'faes.matisse@gmail.com';
  password: string = 'Simbaenkiara<3';

  constructor() { }

  async ngOnInit(){
    var rawger = await Rawger({
      email: this.email,
      password: this.password
    });
    var { users } = rawger;

    this.currentProfile = (await users(this.username).profile()).get();
    this.currentPlaying = (await users(this.username).games('playing')).raw()
    this.currentToPlay = (await users(this.username).games('toplay')).raw()
    this.currentBeaten  = (await users(this.username).games('beaten ')).raw()
    this.currentDropped = (await users(this.username).games('dropped')).raw()
    this.currentYet = (await users(this.username).games('yet ')).raw()
    this.currentCollections = (await users(this.username).collections()).raw()
  }

  async refreshAll(){
    var rawger = await Rawger({
      email: this.email,
      password: this.password
    });
    var { users } = rawger;

    this.currentProfile = (await users(this.username).profile()).get();
    this.currentPlaying = (await users(this.username).games('playing')).raw()
    this.currentPlaying = await this.getNext('playing', this.currentPlaying)
    this.currentToPlay = (await users(this.username).games('toplay')).raw()
    this.currentToPlay = await this.getNext('toplay', this.currentToPlay)
    this.currentBeaten  = (await users(this.username).games('beaten ')).raw()
    this.currentBeaten = await this.getNext('beaten', this.currentBeaten)
    this.currentDropped = (await users(this.username).games('dropped')).raw()
    this.currentDropped = await this.getNext('dropped', this.currentDropped)
    this.currentYet = (await users(this.username).games('yet ')).raw()
    this.currentYet = await this.getNext('yet', this.currentYet)
    this.currentCollections = (await users(this.username).collections()).raw()
  }
  
  async updateGameStatus(gameID: string, status: string){
    var rawger = await Rawger({
      email: this.email,
      password: this.password
    });
    var { users } =  rawger
    console.log("update begin")
    await users(this.username).update().game(gameID, { status: status});
    console.log("update complete")
  }

  async getNext(status: string, gamesIn: IGame[]){
    var rawger = await Rawger({
      email: this.email,
      password: this.password
    });
    var { users } = rawger;
    var nextAmount = Math.round((await users(this.username).games(status)).count() / 20);
    console.log(nextAmount)
    for (let index = 0; index < nextAmount; index++) {
      var nextToPlay = await (await users(this.username).games(status)).next()
      if (nextToPlay != null){
        nextToPlay.raw().forEach(element => {
          gamesIn.push(element)
        });
      }
    }
    return gamesIn;
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

  async refreshPlaying(){
    var playing = (await this.users(this.username).games('playing')).raw()
    this.currentPlaying = [];
    playing.forEach(element => {
      this.currentPlaying.push(element);
    });
  }

  async refreshToPlay(){
    var toplay = (await this.users(this.username).games('toplay')).raw()
    this.currentToPlay = [];
    toplay.forEach(element => {
      this.currentToPlay.push(element);
    });
  }

  async refreshBeaten(){
    var beaten = (await this.users(this.username).games('beaten')).raw()
    this.currentBeaten = [];
    beaten.forEach(element => {
      this.currentBeaten.push(element)
    });
  }

  async refreshDropped(){
    var dropped = (await this.users(this.username).games('dropped')).raw()
    this.currentDropped = [];
    dropped.forEach(element => {
      this.currentDropped.push(element)
    });
  }

  async refreshYet(){
    var yet = (await this.users(this.username).games('yet')).raw()
    this.currentYet = [];
    yet.forEach(element => {
      this.currentYet.push(element)
    });
  }

  async refreshCollections(){
    var collections = (await this.users(this.username).games('collections')).raw()
    this.currentCollections = [];
    collections.forEach(element => {
      this.currentCollections.push(element)
    });

  }
}
