import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController, private loadingController: LoadingController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Game Found!',
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Searching...',
        duration: 250,
        mode: "ios",
        spinner: "circular",
        translucent: false,
        animated: true
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();

      console.log('Loading dismissed!');
  }
}
