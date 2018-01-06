import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {
    this.userId = firebase.auth().currentUser.uid; //user id of current logged in user
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }
  takePicture() {
    console.log("hello");
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
    //  console.log(imageData);
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.storageRef = firebase.storage().ref();
     const filename = Math.floor(Date.now() / 1000);
     const imageRef = this.storageRef.child(`images/${filename}.jpg`);
     console.log(this.storageRef);
     imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      alert('upload success');
      console.log(snapshot.downloadURL);
      this.downloadUrl = snapshot.downloadURL;

     })

  //    .getDownloadURL().then(url =>
  //     console.log(url)
  // );
     //this.test('data');
    

    }, (err) => {
      console.log('imageData not found');
     // Handle error
    }); 
  }
  sendPost() {
    this.navCtrl.setRoot(HomePage);
  }

}
