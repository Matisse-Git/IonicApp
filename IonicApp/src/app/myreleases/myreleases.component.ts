import { Component, OnInit } from '@angular/core';
import { IGame } from '../app.module';
import { APIService } from '../api.service';
import { ProfileService } from '../profile.service';
import { GamedetailsService } from '../gamedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myreleases',
  templateUrl: './myreleases.component.html',
  styleUrls: ['./myreleases.component.scss'],
})
export class MyreleasesComponent implements OnInit {

  months: String[] = [];
  currentWishlist: IGame[] = [];
  janGames: IGame[] = [];
  febGames: IGame[] = [];
  marGames: IGame[] = [];
  aprGames: IGame[] = [];
  mayGames: IGame[] = [];
  juneGames: IGame[] = [];
  julyGames: IGame[] = [];
  augGames: IGame[] = [];
  sepGames: IGame[] = [];
  oktGames: IGame[] = [];
  novGames: IGame[] = [];
  decGames: IGame[] = [];
  currentMonth: String;
  skeleton: boolean;
  skeletonItems: any;
  currentPage: number = 1;

  constructor(private service: APIService, private profile: ProfileService, private detail: GamedetailsService, private router: Router) { }

  async ngOnInit() {
    this.currentMonth = "jan";
    this.initializeOptions();
    this.currentWishlist = this.profile.currentToPlay
    this.checkMonth();
    this.currentWishlist = this.checkPlatforms(this.currentWishlist);
    console.log(this.currentWishlist)
  }

  segmentChanged(ev: any, segmentValue: String) {
    if (segmentValue == "JAN") {
      this.currentMonth = "jan";
    }
    if (segmentValue == "FEB") {
      this.currentMonth = "feb";
    }
    if (segmentValue == "MAR") {
      this.currentMonth = "mar"
    }
    if (segmentValue == "APR") {
      this.currentMonth = "apr";
    }
    if (segmentValue == "MAY") {
      this.currentMonth = "may";
    }
    if (segmentValue == "JUNE") {
      this.currentMonth = "june";
    }
    if (segmentValue == "JULY") {
      this.currentMonth = "july";
    }
    if (segmentValue == "AUG") {
      this.currentMonth = "aug";
    }
    if (segmentValue == "SEP") {
      this.currentMonth = "sep";
    }
    if (segmentValue == "OKT") {
      this.currentMonth = "okt";
    }
    if (segmentValue == "NOV") {
      this.currentMonth = "nov";
    }
    if (segmentValue == "DEC") {
      this.currentMonth = "dec";
    }

    console.log('Segment changed', ev);
    console.log(segmentValue)
  }

  showSkeleton() {
    for (let index = 0; index < 15; index++) {
      if (this.skeletonItems.length < 15) {
        this.skeletonItems.push("")
      }
    }
    this.skeleton = true;
  }

  goToDetails(gameIn: IGame) {
    this.service.getGameDetailed(gameIn.id).subscribe(game => {
      this.detail.setGame(game);
      console.log("game set")
      this.router.navigate(['details'])
      console.log("routed")
    })
  }


  checkPlatforms(games: IGame[]) {
    games.forEach(element => {
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
    })
    return games
  }

  initializeOptions() {
    this.months.push("JAN");
    this.months.push("FEB");
    this.months.push("MAR");
    this.months.push("APR");
    this.months.push("MAY");
    this.months.push("JUNE");
    this.months.push("JULY");
    this.months.push("AUG");
    this.months.push("SEP");
    this.months.push("OKT");
    this.months.push("NOV");
    this.months.push("DEC");
  }

  checkMonth() {
    var newWishlist = Array<IGame>();
    this.currentWishlist.forEach(element => {
      if (element.released != null) {
        var charArr = element.released.split('')
        var monthString = charArr[5] + charArr[6];
        var yearString = charArr[0] + charArr[1] + charArr[2] + charArr[3]
        console.log(element.name.toString() + " "  + element.released + " " + monthString + " " + yearString)
        if (yearString == "2020") {
          switch (monthString) {
            case "01":
              element.JAN = true; 
              this.janGames.push(element)
              break;
            case "02":
              element.FEB = true;
              this.febGames.push(element)
              break;
            case "03":
              element.MAR = true;
              this.marGames.push(element)
              break;
            case "04":
              element.APR = true;
              this.aprGames.push(element)
              break;
            case "05":
              element.MAY = true;
              this.mayGames.push(element)
              break;
            case "06":
              element.JUNE = true;
              this.juneGames.push(element)
              break;
            case "07":
              element.JULY = true;
              this.julyGames.push(element)
              break;
            case "08":
              element.AUG = true;
              this.augGames.push(element)
              break;
            case "09":
              element.SEP = true;
              this.sepGames.push(element)
              break;
            case "10":
              element.OKT = true;
              this.oktGames.push(element)
              break;
            case "11":
              element.NOV = true;
              this.novGames.push(element)
              break;
            case "12":
              element.DEC = true;
              this.decGames.push(element)
              break;
          }
        }
      }
      newWishlist.push(element);
    });

    this.currentWishlist = newWishlist;
  }


}

interface ICurrentMonth {
  jan: boolean;
  feb: boolean;
  mar: boolean;
  apr: boolean;
  may: boolean;
  june: boolean;
  july: boolean;
  aug: boolean;
  sep: boolean;
  okt: boolean;
  nov: boolean;
  dec: boolean;
}
