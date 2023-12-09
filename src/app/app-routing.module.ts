import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'pages', pathMatch: 'full'},
  { path: '', 
    loadChildren: () => import('./modules/landpage/landpage.module').then(m=> m.LandpageModule)
  },  
  { 
    path: 'pages', 
    component: LayoutComponent, 
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
