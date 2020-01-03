import { Injectable } from '@angular/core';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { Tab2Page } from './tab2/tab2.page';
import { Tab1Page } from './tab1/tab1.page';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController, private loadingController: LoadingController,
    public popoverController: PopoverController) { }

  public async presentToast(toastMessage: string, toastDuration: number) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: toastDuration,
      mode: "ios",
      keyboardClose: true,
      showCloseButton: true
    });
    toast.present();
  }

async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: Tab1Page,
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
