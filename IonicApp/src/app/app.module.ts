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

@NgModule({
  declarations: [AppComponent, GamedetailsComponent, SearchpressComponent, Tab2Page, SearchgenresComponent],
  entryComponents: [SearchpressComponent, Tab2Page, SearchgenresComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, LongPressModule, IonicModule, FormsModule],
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

export const AppConfig: IAppConfig = {    
  gamesEndpoint: "http://localhost:8100/games/"    
};
