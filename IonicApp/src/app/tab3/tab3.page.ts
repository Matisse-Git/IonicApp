import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { ProfileService } from '../profile.service';
import { IGame } from '../app.module';
import { stringify } from 'querystring';
var Rawger = require('rawger');

declare var require: any
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

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

  constructor(private service: APIService, private profile: ProfileService) {}

  async ngOnInit(){
    this.initializeOptions();
    await this.profile.refreshAll();
    this.currentWishlist = this.profile.currentToPlay
    this.checkMonth();
    console.log(this.currentWishlist)
  }

  initializeOptions(){
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

  checkMonth(){
    var newWishlist = Array<IGame>();
    this.currentWishlist.forEach(element => {
      if (element.released != null){
      var charArr = element.released.split('')
      var monthString = charArr[5] + charArr[6];
      console.log(element.released)
      console.log(monthString)
      switch(monthString){
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
      newWishlist.push(element);
    });
    
    this.currentWishlist = newWishlist;
  }


}