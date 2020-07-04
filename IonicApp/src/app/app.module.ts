import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NumericValueAccessor } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicGestureConfig } from './IonicGestureConfig';
import { SearchpressComponent } from './searchpress/searchpress.component';
import { FormsModule } from '@angular/forms';
import { SearchgenresComponent } from './searchgenres/searchgenres.component';
import { YearlytrendingComponent } from './yearlytrending/yearlytrending.component';
import { MostanticipatedComponent } from './mostanticipated/mostanticipated.component';
import { MyreleasesComponent } from './myreleases/myreleases.component';
import { LoginpopoverComponent } from './loginpopover/loginpopover.component';
import { LoginComponent } from './login/login.component';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { I18nSelectPipe } from '@angular/common';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2//compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { IonicStorageModule } from '@ionic/storage';
import { ModalPipe } from './modal.pipe';
import { ModalPageModule } from './modal/modal.module';
import { DatePipe } from '@angular/common';
import { Tab2Page } from './tab2/tab2.page'
import { Gamedetails2Page } from './gamedetails2/gamedetails2.page';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

@NgModule({
  declarations: [
    AppComponent,  
    SearchpressComponent,
    SearchgenresComponent, 
    YearlytrendingComponent,
    MostanticipatedComponent,
    MyreleasesComponent,
    LoginpopoverComponent, 
    LoginComponent,
    ModalPipe,
    Tab2Page,
    Gamedetails2Page],
  entryComponents: [
    SearchpressComponent, 
    SearchgenresComponent, 
    YearlytrendingComponent,
    MyreleasesComponent, 
    MostanticipatedComponent, 
    LoginpopoverComponent, 
    LoginComponent, 
    ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    RouterModule,
    VgCoreModule,    
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicStorageModule.forRoot(),
    ModalPageModule],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    VideoPlayer,
    AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [ 
    SearchpressComponent
  ]
})
export class AppModule {}

export interface IAppConfig {
    gamesEndpoint: string;
}

export interface IResults{
  results: IGame[];
}

export interface IGame{
  name: String;
  id: number;
  rating: number;
  metacritic: number;
  released: String;
  description: String;
  genres: IGenres[];
  background_image: String; 
  platforms: IPlatforms[];
  metacritic_url: String;
  developers: IDevelopers[];
  publishers: IPublisher[];
  stores: IStores;
  clip: IClip;
  score: number;
  playstation: boolean;
  xbox: boolean;
  switch: boolean;
  windows: boolean;
  onWishlist: boolean;
  playing: boolean;
  dropped: boolean;
  completed: boolean;
  yet: boolean;
  JAN: boolean;
  FEB: boolean;
  MAR: boolean;
  APR: boolean;
  MAY: boolean;
  JUNE: boolean;
  JULY: boolean;
  AUG: boolean;
  SEP: boolean;
  OKT: boolean;
  NOV: boolean;
  DEC: boolean;
}

export interface IClip{
  clip: string;
  clips: IClips;
  preview: string;
  video: string;
}

export interface IClips{
  320: string;
  640: string;
  full: string;
}

export interface IPublisher{
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IStore{
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface IStores{
  id: number;
  store: IStore;
  url_en: string;
  url_ru: string;
  length: number;
}

export interface IDevelopers{
  id: number;
  name: String;
  games_count: number;
  image_background: String;
}

export interface IScreenshotsResult{
  results: IScreenshot[];
}

export interface IScreenshot{
  id: number;
  image: String;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface IGenres{
  id: number;
  name: String;
}

export interface IPlatforms{
  platform: IPlatform;
  length: number;
}

export interface IPlatform{
  id: number;
  name: String;
}

export interface IUser{
  username: String;
  slug: String;
  full_name: String;
  bio: String;
  avatar: String;
  background: String;
  counters: ICounter;
  share: String;
}

export interface ICounter{
  games: number;
  collections: number;
  reviews: number;
  comments: number;
  followers: number;
  following: number;
}

export const AppConfig: IAppConfig = {    
  gamesEndpoint: "http://localhost:8100/games/"    
};
