import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchtabPageRoutingModule } from './searchtab-routing.module';

import { SearchtabPage } from './searchtab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchtabPageRoutingModule
  ],
  declarations: [SearchtabPage]
})
export class SearchtabPageModule {}
