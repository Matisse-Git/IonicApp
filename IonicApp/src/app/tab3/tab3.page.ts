import { Component } from '@angular/core';
import { APIService } from '../api.service'
import { ProfileService } from '../profile.service';
import { IGame, IResults } from '../app.module';
import { stringify } from 'querystring';
import { GamedetailsService } from '../gamedetails.service';
import { Router } from '@angular/router';
var Rawger = require('rawger');

declare var require: any
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  
  constructor() { }

  ngOnInit() {

  }

}