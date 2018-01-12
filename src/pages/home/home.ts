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
  public likes: Array<any> = [];
  userid: any;
  count:number;
  LikeUserIdRef: any;
  public colorFlag: boolean = false;
  // itemUid: any;

  constructor(public navCtrl: NavController,private socialSharing: SocialSharing,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // this.colorFlag = false;
    var user = firebase.auth().currentUser;
    console.log(user);
    let selfRef = firebase.database().ref('/userPost');
    console.log(selfRef);
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        let details = snapuser.val();
        this.items = []; 
      for(let key in details) {
        // this.itemUid = details[key].uid
        details[key].uid = key;  
        console.log(details[key].likes);
        console.log(details[key]);
        this.count = 0; 
        // console.log(details[key].likes);  
        let reference = details[key].likes;
        
        console.log(reference);
        if(reference == undefined) {
          details[key].colorFlag = false;
        }
        for(let likekey in reference ) {
          // this.likes.push(reference[key]); 
          // console.log(reference[key]) 
          details[key].likes[likekey].likeUser=likekey;
          console.log(likekey);
          this.colorFlag = details[key].colorFlag;
          if(likekey == user.uid) {
            details[key].colorFlag = true;
            //this.colorFlag = details[key].colorFlag;
          }
          else {
              details[key].colorFlag = false;
              //this.colorFlag = details[key].colorFlag;
          }
          this.count = this.count+1; 
        }
        details[key].likeCount = this.count;
      
        this.items.push(details[key]);
      

      }
      console.log("start "+this.count);
      console.log(this.items);
      console.log("start");
       /* snapuser.forEach( itemSnap => {
          console.log(itemSnap);
          this.items.push(itemSnap.val());
          return false;
        });*/
      }
   });
   let likeRef = firebase.database().ref('/userPost');
   loading.dismiss();
  }
  goPost() {
    this.navCtrl.push(PostPage);
  }
  onLike(k) {
    this.userid = firebase.auth().currentUser.uid;
    if(this.items[k].likes != undefined){
    // console.log(index);
    
    this.LikeUserIdRef = firebase.database().ref('/userPost/')
    console.log(this.items[k].likes);
    for(var l in this.items[k].likes) {
      this.items[k].likes[l].likeUser=l
      console.log(l);
     if(l == this.userid) {
        firebase.database().ref('/userPost/'+this.items[k].uid+'/likes/'+this.userid).remove();
        this.items[k].colorFlag = false;
      }
      else {
        firebase.database().ref('/userPost/'+this.items[k].uid+'/likes/' + this.userid + '/').set({
          like: true
          });
          this.items[k].colorFlag = true;
      }
    }
    // firebase.database().ref('/userPost/'+this.items[k].uid+'/likes/' + this.userid + '/').set({
    //   like: true
    //   });
  }else{
    firebase.database().ref('/userPost/'+this.items[k].uid+'/likes/' + this.userid + '/').set({
         like: true
         });
         this.items[k].colorFlag = true;
  }
  }
  onShare(index) {
    /*
    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
*/
// Share via email
this.socialSharing.share(this.items[index].userComment,null ,null,this.items[index].userImage).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  onDeletePost(index) {
    this.userid = firebase.auth().currentUser.uid;
    let userIdRef = firebase.database().ref('/userPost/'+this.items[index].userId).key;
    console.log(this.userid)
    console.log(userIdRef);
    if(userIdRef === this.userid){
      firebase.database().ref('/userPost/'+this.items[index].uid).remove();
    }
    else{
      alert('This is not Your Post');
    }
    
  }

}
