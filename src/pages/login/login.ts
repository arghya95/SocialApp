import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    // var user = firebase.auth().currentUser;
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
