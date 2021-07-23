import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayGroundComponent } from './play-ground/play-ground.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'play-ground',
    pathMatch: 'full'
  },
  { path: 'play-ground', component: PlayGroundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
