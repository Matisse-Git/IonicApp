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
  sortingOptions: String[] = [];
  currentGames: IGame[] = [];
  currentPage: number = 1;
  currentGenre: String;
  currentSorting: String = "-rating";
  skeleton: boolean;
  skeletonItems: String[] = [];

  ngOnInit() {
    this.initializeOptions();
  }

  resetPages(){
    this.currentPage = 1;
  }

   getGames(genreIn: String, sortingIn: String){
    this.skeleton = true;
    console.log(this.currentPage)
    if (genreIn != '' && genreIn != null){
    this.currentGenre = genreIn;
    this.currentSorting = this.checkSorting(sortingIn);
    this.service.searchGamesGenrePage(this.currentGenre, this.currentPage, this.currentSorting).subscribe(games => {
      this.currentGames = this.checkPlatforms(games)
      this.skeleton = false;
    })

    
  }
  
  }

  checkSorting(sortingIn: String)
  {
    var newSorting: String;
    switch (sortingIn) {
      case "Most Popular":
        newSorting = "-added"
        break;
      case "Name (A-Z)":
        newSorting = "name"
        break;
      case "Name (Z-A)":
        newSorting = "-name"
        break;
      case "Release Date (Recent-Old)":
        newSorting = "released";
        break;
      case "Release Date (Old-Recent)":
        newSorting = "-released"
        break;
      case "Rating (Good-Bad)":
        newSorting = "-rating"
        break;
      case "Rating (Bad-Good)":
        newSorting = "rating"
        break;
      default:
        break;
    }
    return newSorting;
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
      setTimeout(() => this.getGames(this.currentGenre, this.currentSorting), 500);
    }
  }

  pushGames(event){
    this.currentPage++;
    this.skeleton = true;
    setTimeout(() => {
      console.log('Done');
      this.service.searchGamesGenrePage(this.currentGenre, this.currentPage,this.currentSorting).subscribe(games => {
        var newGames: IGame[] = this.checkPlatforms(games);
        newGames.forEach(element => {
          this.currentGames.push(element);
          this.skeleton = false;
        });
      })
      event.target.complete();

      }, 1500);
  }

  nextPage(){
    this.currentPage++;
    setTimeout(() => this.getGames(this.currentGenre, this.currentSorting), 500);
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

    this.sortingOptions.push("Most Popular")
    this.sortingOptions.push("Name (A-Z)")
    this.sortingOptions.push("Name (Z-A)")
    this.sortingOptions.push("Release Date (Recent - Old)")
    this.sortingOptions.push("Release Date (Old - Recent)")
    this.sortingOptions.push("Rating (Good-Bad)")
    this.sortingOptions.push("Rating (Bad-Good)")
  }

  goToDetails(gameIn: IGame) {
    this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
    })
    this.service.getGameScreenshots(gameIn.id).subscribe(screenshots =>{
      this.detail.clearScreenshots();
      this.detail.pushScreenshots(screenshots.results);
      console.log("screenshots set")
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
