import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchtab',
  templateUrl: './searchtab.page.html',
  styleUrls: ['./searchtab.page.scss'],
})
export class SearchtabPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSearchName(){
    this.router.navigate(['searchName'])
    console.log("routed")
  }

  goToSearchGenre(){
    this.router.navigate(['searchGenre'])
    console.log("routed")
  }

  goToYearlyTrending(){
    this.router.navigate(['yearlyTrending'])
    console.log("routed")
  }

  routeComponent(componentName: string){
    this.router.navigate([componentName])
  }
}
