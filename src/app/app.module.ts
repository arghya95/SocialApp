import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';
import { PostPage } from '../pages/post/post';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

var config = {
  apiKey: "AIzaSyA_vQzljIM1NebUlDa1TNu2_WJiZk54kAI",
  authDomain: "loginapp-e210a.firebaseapp.com",
  databaseURL: "https://loginapp-e210a.firebaseio.com",
  projectId: "loginapp-e210a",
  storageBucket: "loginapp-e210a.appspot.com",
  messagingSenderId: "394798466089"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    PostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Facebook,
    GooglePlus,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
