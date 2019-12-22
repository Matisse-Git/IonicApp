import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { IGame } from '../app.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private client: HttpClient, private service: APIService, private router: Router, private statusBar: StatusBar) {
    this.statusBar.hide();
  }

  currentGames: IGame[] = [];

  ngOnInit(){
    this.service.getGames().subscribe(game =>{
      game.results.forEach(element => {
        this.currentGames.push(element);
      });
    })
  }

  getGames(){
    this.service.getGames().subscribe(game =>{
      game.results.forEach(element => {
        this.currentGames.push(element);
      });
    })
  }
}
