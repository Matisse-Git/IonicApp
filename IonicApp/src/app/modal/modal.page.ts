import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ProfileService } from '../profile.service';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from '../messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private settings: SettingsService, private profile: ProfileService, private modalCtrl: ModalController,
    private http: HttpClient, private messages: MessagesService, private router: Router) { }

  ngOnInit() {
  }

  login(username: string, email: string, password: string) {
    const formData = new FormData()
    formData.set('email', email);
    formData.set('password', password);
    this.http.post('https://rawg.io/api/auth/login', formData).subscribe((resp) => {
      console.log(resp)
        this.settings.setLoggedIn(true);
        this.profile.setUsername(username)
        this.profile.setEmail(email)
        this.profile.setPassword(password)
        this.dismiss();
      
    }, 
    err => {
      this.messages.presentToast('Wrong E-mail or Password entered', 2000)
    })
    
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.router.navigate([''])
  }
}
