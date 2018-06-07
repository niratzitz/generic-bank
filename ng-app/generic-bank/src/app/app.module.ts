import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { LoginComponent } from './components/login/login.component';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Welcome to Generic Bank’s Customer Portal'
    }
  },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/login',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
