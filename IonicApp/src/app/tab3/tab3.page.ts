import { Component } from '@angular/core';
import { APIService } from '../api.service'
var Rawger = require('rawger');

declare var require: any
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private service: APIService) {}

  ngOnInit(){

  }


}