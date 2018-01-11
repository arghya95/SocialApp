import { Component, ViewChild,NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = LoginPage;
  public rootPage:any;

  pages: Array<{title: string, component: any}>;
  //constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu: MenuController) {
  constructor(public platform: Platform, public statusBar: StatusBar, public zone:NgZone,public splashScreen: SplashScreen, public menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
    ];

    
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user);
        this.zone.run(()=>{
        this.rootPage = HomePage;
        })
        // User is signed in.
      } else {
        console.log(user);
        this.zone.run(()=>{
        this.rootPage = LoginPage;
        })
        // No user is signed in.
      }
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    console.log("logout clicked....")
    firebase.auth().signOut();
    this.nav.setRoot(LoginPage);
    // this.sidemenuhide = true
    this.menu.close();
  }

 


}