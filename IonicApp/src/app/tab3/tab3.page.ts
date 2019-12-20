import { Component } from '@angular/core';
import { APIService } from '../api.service'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  email: String;

  constructor(private service: APIService) {}

  ngOnInit(){
    this.email = this.service.currentUser;
  }

}
