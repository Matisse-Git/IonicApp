import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  autoplay: boolean;
  scShow: boolean;
  loggedIn: boolean;

  constructor(private storage: Storage) { }

  async getSetting(name: string) {
    await this.storage.get(name).then((value) => {
      switch (name) {
        case "autoplaySetting":
          this.autoplay = value;
          break;
        case "scShowSetting":
          this.scShow = value;
          break;
        case "loggedInSetting":
          if (value != null){
            this.loggedIn = value;
          }
          else {
            this.loggedIn = false;
            this.storage.set('loggedInSetting', false);
          }
          break;
      }
    })
  }

  ngOnInit() {

  }

  setLoggedIn(value: boolean){
    this.storage.set('loggedInSetting', value)
    this.loggedIn = value;
  }

  changeAutoplay(value: boolean) {
    this.autoplay = value;
    console.log(`autoplay -> ${value}`)
    this.storage.set('autoplaySetting', value);
  }

  changeSc(value: boolean) {
    this.scShow = value;
    console.log(`scShow -> ${value}`)
    this.storage.set('scShowSetting', value);
  }
}
