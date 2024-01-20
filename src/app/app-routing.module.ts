import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './home-page/home-page.component';
import { adminGuard } from './authentication/admin.guard';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { supervisorGuard } from './authentication/supervisor.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '', 
    component: HomepageComponent
  },
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'autore',
    loadChildren: () => import('./archivi/autore/autore.module').then(m => m.AutoreModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'genere',
    loadChildren: () => import('./archivi/genere/genere.module').then(m=>m.GenereModule),
    canActivate: [AuthenticationGuard, supervisorGuard]
  },
  {
    path: 'sottocategoria',
    loadChildren: () => import('./archivi/sottocategoria/sottocategoria.module').then(m => m.SottocategoriaModule),
    canActivate: [AuthenticationGuard, supervisorGuard]
  },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'area',
    loadChildren:() => import('./archivi/area/area.module').then(m => m.AreaModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'professore',
    loadChildren: () => import('./archivi/professore/professore.module').then(m => m.ProfessoreModule),
    canActivate:[AuthenticationGuard]
  },
  // {
  //   path: 'ordineacquisto',
  //   loadChildren: () => import('./ordineacquisto/ordineacquisto.module').then(m => m.OrdineAcquistoModule),
  //   canActivate:[AuthenticationGuard, supervisorGuard]
  // },
  // {
  //   path: 'preventivo',
  //   loadChildren: () => import('./preventivo/preventivo.module').then(m => m.PreventivoModule),
  //   canActivate:[AuthenticationGuard]
  // },
  // {
  //   path: 'fatturapassiva',
  //   loadChildren: () => import('./fattura-passiva/fattura-passiva.module').then(m => m.FatturaPassivaModule),
  //   canActivate:[AuthenticationGuard, supervisorGuard]
  // },
  {
    path:'utente',
    loadChildren: ()=> import('./authentication/authentication.module').then(m=> m.AuthenticationModule),
  },
  {
    path:'**',
    component: NotFoundPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
