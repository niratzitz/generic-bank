import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ExposeHeightDirective } from './directives/expose-height.directive';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Welcome to Generic Bank’s Customer Portal',
      showBack: false
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Open an account',
      showBack: true
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login to your account',
      showBack: true
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      title: '',
      showBack: true
    }
  },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ExposeHeightDirective,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
