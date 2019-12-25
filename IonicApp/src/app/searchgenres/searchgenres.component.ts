import { Component, OnInit } from '@angular/core';
import { IGame, IPlatform, IPlatforms, IResults } from '../app.module';
import { APIService } from '../api.service';
import { GamedetailsService } from '../gamedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchgenres',
  templateUrl: './searchgenres.component.html',
  styleUrls: ['./searchgenres.component.scss'],
})
export class SearchgenresComponent implements OnInit {

  constructor(private service: APIService, private detail: GamedetailsService, private router: Router) { }

  genreOptions: String[] = [];
  currentGames: IGame[] = [];
  currentPage: number = 1;
  currentGenre: String;
  skeleton: boolean;
  skeletonItems: String[] = [];

  ngOnInit() {
    this.initializeOptions();
  }

  resetPages(){
    this.currentPage = 1;
  }

   getGames(genreIn: String){
    this.skeleton = true;
    console.log(this.currentPage)
    if (genreIn != '' && genreIn != null){
    this.currentGenre = genreIn;
    this.service.searchGamesGenrePage(this.currentGenre, this.currentPage).subscribe(games => {
      this.currentGames = this.checkPlatforms(games)
      this.skeleton = false;
    })
  }
  }

  showSkeleton() {
      for (let index = 0; index < 15; index++) {
        if (this.skeletonItems.length < 15) {
          this.skeletonItems.push("")
        }
      }
      this.skeleton = true;
  }


  previousPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      setTimeout(() => this.getGames(this.currentGenre), 500);
    }
  }

  pushGames(event){
    this.currentPage++;
    this.skeleton = true;
    setTimeout(() => {
      console.log('Done');
      this.service.searchGamesGenrePage(this.currentGenre, this.currentPage).subscribe(games => {
        var newGames: IGame[] = this.checkPlatforms(games);
        newGames.forEach(element => {
          this.currentGames.push(element);
          this.skeleton = false;
        });
      })
      event.target.complete();

      }, 500);
  }

  nextPage(){
    this.currentPage++;
    setTimeout(() => this.getGames(this.currentGenre), 500);
  }

  scrollToTop(){
    document.querySelector('ion-content').scrollToTop(2500);
  }

  initializeOptions(){
    this.genreOptions.push("action")
    this.genreOptions.push("indie")
    this.genreOptions.push("adventure")
    this.genreOptions.push("role-playing-games-rpg")
    this.genreOptions.push("shooter")
    this.genreOptions.push("strategy")
    this.genreOptions.push("casual")
    this.genreOptions.push("simulation")
    this.genreOptions.push("arcade")
    this.genreOptions.push("puzzle")
    this.genreOptions.push("platformer")
    this.genreOptions.push("racing")
    this.genreOptions.push("sports")
    this.genreOptions.push("massively-multiplayer")
    this.genreOptions.push("family")
    this.genreOptions.push("fighting")
    this.genreOptions.push("board-games")
    this.genreOptions.push("educational")
    this.genreOptions.push("card")
  }

  goToDetails(gameIn: IGame) {
    this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
      this.router.navigate(['details'])
      console.log("routed")
    })
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
}
