import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { delay } from 'rxjs/operators';

@Injectable()
export class FirebaseService {
    urls = [];
    constructor(private db: AngularFirestore, private storage: AngularFireStorage){
     // this.getImages();
    }

    addMessage(value){
        delete value.link;
        return this.db.collection('leaderboard').add(value);
      }

    getMessage(mId){
       return this.db.collection('leaderboard').doc(mId).valueChanges().pipe(delay(1000)); 
    }

    getImages(){
      let storageRef = this.storage.ref('images');
      
      storageRef.listAll().subscribe((result)=>{
        result.items.forEach((imageRef)=> {
          imageRef.getDownloadURL().then(r=>{
            console.log(r);
            this.urls.push(r);
          })
        });
      });
    }
}

