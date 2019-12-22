import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
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
