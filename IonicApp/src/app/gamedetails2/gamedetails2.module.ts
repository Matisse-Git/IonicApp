import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Gamedetails2PageRoutingModule } from './gamedetails2-routing.module';

import { Gamedetails2Page } from './gamedetails2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Gamedetails2PageRoutingModule
  ],
  declarations: [Gamedetails2Page]
})
export class Gamedetails2PageModule {}
