import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamedetailsComponent } from './gamedetails/gamedetails.component';
import { IonicGestureConfig } from './IonicGestureConfig';
import { LongPressModule } from 'ionic-long-press';
import { SearchpressComponent } from './searchpress/searchpress.component';
import { FormsModule } from '@angular/forms';
import { Tab2PageModule } from './tab2/tab2.module';
import { Tab2Page } from './tab2/tab2.page';
import { SearchgenresComponent } from './searchgenres/searchgenres.component';
import { YearlytrendingComponent } from './yearlytrending/yearlytrending.component';
import { MostanticipatedComponent } from './mostanticipated/mostanticipated.component';
import { MyreleasesComponent } from './myreleases/myreleases.component';
import { LoginpopoverComponent } from './loginpopover/loginpopover.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, GamedetailsComponent, SearchpressComponent, 
    Tab2Page, SearchgenresComponent, YearlytrendingComponent,MostanticipatedComponent,MyreleasesComponent,
    LoginpopoverComponent, LoginComponent],
  entryComponents: [SearchpressComponent, Tab2Page, SearchgenresComponent, YearlytrendingComponent,
  MyreleasesComponent, MostanticipatedComponent, LoginpopoverComponent, LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, 
    LongPressModule, IonicModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ],
  bootstrap: [AppComponent],
  exports: [ SearchpressComponent ]
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
