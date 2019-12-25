import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { IGame, IResults } from '../app.module';

@Component({
  selector: 'app-yearlytrending',
  templateUrl: './yearlytrending.component.html',
  styleUrls: ['./yearlytrending.component.scss'],
})
export class YearlytrendingComponent implements OnInit {


  constructor(private service: APIService) { }

  ngOnInit() {
    this.initializeOptions();
  }

  currentGames: IGame[] = [];
  currentPage: number = 1;
  currentYear: number = 2019;
  yearOptions: String[] = [];

  skeleton: boolean;
  skeletonItems: String[] = [];

  getGames(year: number){
    this.skeleton = true;
    this.currentYear = year;
    console.log(this.currentPage);
    this.service.getYearlyPopularGames(this.currentYear.toString(), this.currentPage).subscribe(games =>{
      this.currentGames = this.checkPlatforms(games)
      this.skeleton = false;
    })

  }

  scrollToTop(){
    document.querySelector('ion-content').scrollToTop(2500);
  }

  resetPages(){
    this.currentPage = 1;
  }

  initializeOptions(){
    for (let index = 2020; index > 1990; index--) {
      this.yearOptions.push(index.toString());
    }
    console.log(this.yearOptions)
  }

  checkPlatforms(games: IResults){
    games.results.forEach(element => {
      element.platforms.forEach(platforms => {
        if (platforms.platform.name == "PC"){
          console.log(element.name + " --> PC")
          element.windows = true;
        }
        if (platforms.platform.name == "PlayStation 4"){
          console.log(element.name + " --> PS4")
          element.playstation = true;
        }
        if (platforms.platform.name == "Xbox One"){
          console.log(element.name + " --> XBOX")
          element.xbox = true;
        }
        if (platforms.platform.name == "Nintendo Switch"){
          console.log(element.name + " --> SWITCH")
          element.switch = true;
        }
      })
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
pushGames(event){
  this.currentPage++;
  this.skeleton = true;
  setTimeout(() => {
    console.log('Done');
    this.service.getYearlyPopularGames(this.currentYear.toString(), this.currentPage).subscribe(games => {
      var newGames: IGame[] = this.checkPlatforms(games);
      newGames.forEach(element => {
        this.currentGames.push(element);
        this.skeleton = false;
      });
    })
    event.target.complete();

    }, 1500);
}
}
