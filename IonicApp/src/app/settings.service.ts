import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  autoplay: boolean;
  scShow: boolean;

  constructor(private storage: Storage) {}

   async getSetting(name: string){
    await this.storage.get(name).then((value) =>{
      switch(name){
        case "autoplaySetting":
          this.autoplay = value;
          break;
        case "scShowSetting":
          this.scShow = value;
          break;
      }
    })
    }

  ngOnInit(){

  }

  changeAutoplay(value: boolean){
    this.autoplay = value;
    console.log(`autoplay -> ${value}`)
    this.storage.set('autoplaySetting', value);
  }

  changeSc(value: boolean){
    this.scShow = value;
    console.log(`scShow -> ${value}`)
    this.storage.set('scShowSetting', value);
  }
}
