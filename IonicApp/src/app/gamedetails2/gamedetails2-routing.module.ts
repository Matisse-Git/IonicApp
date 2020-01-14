import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Gamedetails2Page } from './gamedetails2.page';

const routes: Routes = [
  {
    path: '',
    component: Gamedetails2Page
  }
  //,{ path: 'screenshots', component: screenshotsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Gamedetails2PageRoutingModule {}
