import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { PostPage } from '../post/post';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email: any;
  public username: any;

  constructor(public navCtrl: NavController,private socialSharing: SocialSharing) {
    let selfRef = firebase.database().ref('/userSummary/' + firebase.auth().currentUser.uid);
    console.log(selfRef);
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        console.log(snapuser.val());
        this.email = snapuser.val().email;
        this.username = snapuser.val().fname + ' ' + snapuser.val().lname;
      }
   })
  }
  goPost() {
    this.navCtrl.push(PostPage);
  }
  onShare() {
    /*
    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
*/
// Share via email
this.socialSharing.share('Demo Message',null ,null,'https://demoexample.in').then(() => {
  // Success!
}).catch(() => {
  // Error!
});
  }

}
