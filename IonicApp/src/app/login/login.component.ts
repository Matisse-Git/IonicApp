import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(private profile: ProfileService, private router: Router, private admobFree: AdMobFree) {

   }

  ngOnInit() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: "ca-app-pub-5455924738055540/3815089607",
      isTesting: false,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

  updateUsername(username: string){
    this.username = username;
  }
  updateEmail(email: string){
    this.email = email;
  }
  updatePassword(password: string){
    this.password = password;
  }
  async saveSettings(){
    this.profile.username = this.username;
    this.profile.email = this.email;
    this.profile.password = this.password;
    await this.profile.refreshAll();
    this.router.navigate(['tabs/tab1']);
  }



}
