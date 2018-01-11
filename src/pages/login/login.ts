import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: any;
  public password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private googlePlus: GooglePlus,private fb: Facebook) {
    var user = firebase.auth().currentUser;
    // console.log(user);

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goLogin() {
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
     .then(user => {
       console.log(this.email);
       if(user) {
         this.navCtrl.setRoot(HomePage);
       }
     })
      .catch((_error) => {
        alert(_error.message);
      });
   }

   doGoogleLogin() {
    this.googlePlus.login({
      'webClientId': '394798466089-mpc8sq8nhhomh9fiumv8nafmrof3a5uu.apps.googleusercontent.com',
      'offline': true
    })
  .then(res => {
    console.log(res);
    var provider = firebase.auth.GoogleAuthProvider.credential(res.idToken);
               console.log(provider);
               firebase.auth().signInWithCredential(provider)
        .then( response => {
            console.log("Firebase success: " + JSON.stringify(response));
            firebase.database().ref('/userSummary').child(response.uid).set({
              fname: res.givenName,
              lname: res.familyName,
              email: res.email,
              mobile: res.imageUrl
            })
            this.navCtrl.setRoot(HomePage);
        });
  })
  .catch(err => console.error(err));
  }
  
  doFacebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
    console.log('Logged into Facebook!', res);
    var provider = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
               console.log(provider);
               firebase.auth().signInWithCredential(provider)
        .then( response => {
            console.log(response);
            firebase.database().ref('/userSummary').child(response.uid).set({
              name: response.displayName,
              email: response.providerData[0].email,
              mobile: response.photoURL
            })
            this.navCtrl.setRoot(HomePage);
        });
  })
  .catch(e => console.log('Error logging into Facebook', e));
  }

   goRegister() {
    this.navCtrl.push(RegisterPage);
  }
  forgetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Forget Password',
      message: "Enter Email Address for Password Recovery",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            firebase.auth().sendPasswordResetEmail(data.email)
            .then(() => 
              alert('Reset Password Email Sent')
            )
            .catch((error) => 
              alert(error)
            )
          }
        }
      ]
    });
    prompt.present();
  }

}
