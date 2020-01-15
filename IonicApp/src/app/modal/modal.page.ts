import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ProfileService } from '../profile.service';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private settings: SettingsService, private profile: ProfileService, private modalCtrl: ModalController,
    private http: HttpClient) { }

  ngOnInit() {
  }

  login(username: string, email: string, password: string) {
    const formData = new FormData()
    formData.set('email', email);
    formData.set('password', password);
         this.http.post('https://rawg.io/api/auth/login', formData).subscribe((resp) => {
        console.log(resp)
        if (resp != null){
          this.settings.setLoggedIn(true);
          this.profile.setUsername(username)
          this.profile.setEmail(email)
          this.profile.setPassword(password)    
          this.dismiss(); 
        }
      })

  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
