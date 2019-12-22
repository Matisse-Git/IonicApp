import { Injectable } from '@angular/core';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { Tab2Page } from './tab2/tab2.page';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController, private loadingController: LoadingController,
    public popoverController: PopoverController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Game Found!',
      duration: 2000
    });
    toast.present();
  }

async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: Tab2Page,
      event: ev,
      translucent: true
    });
    return await popover.present();
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
