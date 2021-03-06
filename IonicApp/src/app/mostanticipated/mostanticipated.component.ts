import { Component, OnInit } from '@angular/core';
import { IGame, IResults } from '../app.module';
import { APIService } from '../api.service';
import { GamedetailsService } from '../gamedetails.service';
import { Router } from '@angular/router';
import { MethodService } from '../method.service';

@Component({
  selector: 'app-mostanticipated',
  templateUrl: './mostanticipated.component.html',
  styleUrls: ['./mostanticipated.component.scss'],
})
export class MostanticipatedComponent implements OnInit {


  constructor(private service: APIService, private detail: GamedetailsService, private router: Router, private methods: MethodService) { }

  ngOnInit() {
    this.getGames(this.currentPage)
  }

  currentGames: IGame[] = [];
  currentPage: number = 1;
  skeleton: boolean;
  skeletonItems: String[] = [];

  getGames(year: number) {
    this.skeleton = true;
    this.service.getMostAnticipatedGames(this.currentPage).subscribe(games => {
      this.currentGames = this.checkPlatforms(games)
      this.skeleton = false;
    })
  }

  disableSkeleton() {
    this.skeleton = false;
  }

  goToDetails(gameIn: IGame) {
    this.methods.goToDetails(gameIn)
  }


  scrollToTop() {
    document.querySelector('ion-content').scrollToTop(2500);
  }

  resetPages() {
    this.currentPage = 1;
  }

  checkPlatforms(games: IResults) {
    games.results.forEach(element => {
      if (element.platforms != null) {
        element.platforms.forEach(platforms => {
          if (platforms.platform.name == "PC") {
            console.log(element.name + " --> PC")
            element.windows = true;
          }
          if (platforms.platform.name == "PlayStation 4") {
            console.log(element.name + " --> PS4")
            element.playstation = true;
          }
          if (platforms.platform.name == "Xbox One") {
            console.log(element.name + " --> XBOX")
            element.xbox = true;
          }
          if (platforms.platform.name == "Nintendo Switch") {
            console.log(element.name + " --> SWITCH")
            element.switch = true;
          }
        })
      }
    })
    return games.results
  }

  showSkeleton() {
    for (let index = 0; index < 15; index++) {
      if (this.skeletonItems.length < 15) {
        this.skeletonItems.push("")
      }
    }
    this.skeleton = true;
  }
  pushGames(event) {
    this.currentPage++;
    setTimeout(() => {
      console.log('Done');
      this.service.getMostAnticipatedGames(this.currentPage).subscribe(games => {
        var newGames: IGame[] = this.checkPlatforms(games);
        newGames.forEach(element => {
          this.currentGames.push(element);
        });
      })
      event.target.complete();

    }, 1500);
  }
}
