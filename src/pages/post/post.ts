import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  public base64Image: any;
  storageRef:any;
  downloadUrl:any;
  userId: any;
  postContent:string;
  selfRef:any;
  userName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public toastCtrl: ToastController) {
    this.userId = firebase.auth().currentUser.uid; //user id of current logged in user
    let selfRef = firebase.database().ref('/userSummary/' + this.userId);
    console.log(selfRef);
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()) {
        console.log(snapuser.val()); 
        this.userName = snapuser.val().fname + ' ' + snapuser.val().lname;
      }
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }
  takePicture() {
    console.log("hello");
    let options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
    //  console.log(imageData);
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('imageData not found');
     // Handle error
    }); 
  }
  sendPost(base64Image,userId) {
    // console.log(this.base64Image);
      if(this.base64Image === undefined) {
        if(this.postContent === undefined || this.postContent === null) {
          console.log('ldle'+this.postContent)
          const toast = this.toastCtrl.create({
            message: "Please Put Some Comment in Comment Section..",
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          toast.present();  
        }
        else {
        firebase.database().ref('/userPost/').push({
          userId: this.userId,
          userName:this.userName,
          // userImage:snapshot.downloadURL,
          userComment:this.postContent
        });
        this.navCtrl.setRoot(HomePage); 
        }
      }
      else {
        if(this.postContent === undefined) {
          const toast = this.toastCtrl.create({
            message: "Please Put Some Comment in Comment Section..",
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
          toast.present();  
      }    
      else {
      this.storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = this.storageRef.child(`images/${filename}.jpg`);
      console.log(this.storageRef);
      imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      alert('upload success');
      console.log(snapshot.downloadURL);
        this.downloadUrl = snapshot.downloadURL;
        console.log(this.postContent);
     
        firebase.database().ref('/userPost/').push({
          userId: this.userId,
          userName:this.userName,
          userImage:snapshot.downloadURL,
          userComment:this.postContent
        });
    })
    this.navCtrl.setRoot(HomePage); 
    }    
  }           
      // console.log(this.selfRef);  
  }

}
