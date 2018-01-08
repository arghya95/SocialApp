import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { PostPage } from '../post/post';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userId: any;
  public userName: any;
  public userImage:any;
  public userComment:any;
  public items: Array<any> = [];
  userid: any;
  itemUid: any;



  constructor(public navCtrl: NavController,private socialSharing: SocialSharing,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let selfRef = firebase.database().ref('/userPost');
    console.log(selfRef);
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        let details = snapuser.val();
        this.items = [];
      for(let key in details){
        this.itemUid = details[key].uid
        details[key].uid = key;
        this.items.push(details[key]);
        // this.onLike(this.itemUid);

        //console.log("key is: " + key)
        //console.log(details[key])
        //console.log(details)
      }
      console.log("start");
      console.log(this.items);
      console.log("start");
       /* snapuser.forEach( itemSnap => {
          console.log(itemSnap);
          this.items.push(itemSnap.val());
          return false;
        });*/
      }
   });
   loading.dismiss();
  }
  goPost() {
    this.navCtrl.push(PostPage);
  }
  onLike(data) {
    this.userid = firebase.auth().currentUser.uid;
    firebase.database().ref('/userPost/'+this.itemUid+'like').set(this.userid);
  }
  onShare(userImage,userComment) {
    /*
    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
*/
// Share via email
this.socialSharing.share(this.userComment,null ,null,this.userImage).then(() => {
  // Success!
}).catch(() => {
  // Error!
});
  }

}
