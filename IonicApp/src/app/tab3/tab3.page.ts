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

  async ngOnInit(){
    var rawger = await Rawger();
    var { users } = rawger;
    var playing = (await users('Matttske').games('playing')).get();
    var toplay = (await users('Matttske').games('toplay')).get();
    var beaten  = (await users('Matttske').games('beaten ')).get();
    var dropped = (await users('Matttske').games('dropped')).get();
    var yet = (await users('Matttske').games('yet ')).get();
    var owned  = (await users('Matttske').games('owned ')).get();
    var collections = (await users('Matttske').collections()).get();
    
    console.log(playing);
    console.log(toplay);
    console.log(beaten);
    console.log(dropped);
    console.log(yet);
    console.log(owned);
    console.log(collections)
  }


}