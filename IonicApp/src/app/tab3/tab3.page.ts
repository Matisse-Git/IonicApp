import { Component } from '@angular/core';
import { APIService } from '../api.service'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  currentUser: IUser;

  constructor(private service: APIService) {}

  ngOnInit(){
    this.currentUser = this.service.currentUser;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.currentUser = this.service.currentUser;
    }, 50);
  }

}

interface IUser{
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}