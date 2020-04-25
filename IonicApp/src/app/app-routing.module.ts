import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2/tab2.page';
import { GamedetailsComponent } from './gamedetails/gamedetails.component';
import { Tab2PageModule } from './tab2/tab2.module';
import { SearchgenresComponent } from './searchgenres/searchgenres.component';
import { YearlytrendingComponent } from './yearlytrending/yearlytrending.component';
import { MostanticipatedComponent } from './mostanticipated/mostanticipated.component';
import { MyreleasesComponent } from './myreleases/myreleases.component';
import { LoginComponent } from './login/login.component';
import { Gamedetails2Page } from './gamedetails2/gamedetails2.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)    
  }
  ,{ path: 'details', component: GamedetailsComponent },
  { path: 'searchName', component: Tab2Page},
  { path: 'searchGenre', component: SearchgenresComponent},
  { path: 'yearlyTrending', component: YearlytrendingComponent},
  { path: 'mostAnticipated', component: MostanticipatedComponent },
  { path: 'myReleases', component: MyreleasesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'details2', component: Gamedetails2Page},
  {
    path: 'searchtab',
    loadChildren: () => import('./searchtab/searchtab.module').then( m => m.SearchtabPageModule)
  },
  {
    path: 'gamedetails2',
    loadChildren: () => import('./gamedetails2/gamedetails2.module').then( m => m.Gamedetails2PageModule)
  },  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
