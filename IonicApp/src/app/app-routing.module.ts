import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2/tab2.page';
import { GamedetailsComponent } from './gamedetails/gamedetails.component';
import { Tab2PageModule } from './tab2/tab2.module';
import { SearchgenresComponent } from './searchgenres/searchgenres.component';
import { YearlytrendingComponent } from './yearlytrending/yearlytrending.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)    
  }
  ,{ path: 'details', component: GamedetailsComponent },
  { path: 'searchName', component: Tab2Page},
  { path: 'searchGenre', component: SearchgenresComponent},
  { path: 'yearlyTrending', component: YearlytrendingComponent},
  {
    path: 'searchtab',
    loadChildren: () => import('./searchtab/searchtab.module').then( m => m.SearchtabPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
