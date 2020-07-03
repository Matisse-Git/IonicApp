import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  autoplay: boolean;
  scShow: boolean;
  loggedIn: boolean;
  backgroundBlur: boolean;

  constructor(private storage: Storage) { }

  async getSetting(name: string) {
    await this.storage.get(name).then((value) => {
      switch (name) {
        case "autoplaySetting":
          if (value != null){
            this.autoplay = value;
          }
          else{
            this.autoplay = true;
          }
          break;
        case "scShowSetting":
          if (value != null){
            this.scShow = value;
          }
          else{
            this.scShow = true;
          }
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
        case "backgroundBlurSetting":
          if (value != null){
            this.backgroundBlur = value;
          }
          else{
            this.backgroundBlur = true;
            this.storage.set('backgroundBlurSetting', true);
          }
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

  changeBackgroundBlur(value: boolean){
    this.backgroundBlur = value;
    console.log(`backgroundBlur -> ${value}`);
    this.storage.set('backgroundBlurSetting', value);
  }
}
