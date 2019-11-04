import { Injectable, NgZone } from '@angular/core';
import * as firebase from "nativescript-plugin-firebase";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    items: any;

    constructor(private ngZone: NgZone) {
    }

    initFirebase() {
        firebase.init().then(() => console.log("firebase.init done"),
            (error) => console.log("firebase.init error: " + error));
    }

    push(url: string, value: object) {
        firebase.push(url, value).then(() => {
            console.log(`[*] Info : Your data was pushed by ${url} url!`);
        }, (error) => {
            console.log("[*] Error : While pushing your data to Firebase, with error: " + error);
        });
    }

    getMyWishList(): Observable<any> {
        return new Observable((observer: any) => {
            let path = 'ideas';
            let onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    let results = this.handleSnapshot(snapshot.value);
                    console.log(JSON.stringify(results));
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        });
    }

    handleSnapshot(data: any) {
        return data
            ? Object.keys(data)
            .map(key => ({...{id: key}, ...data[key]}))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            : [];
    }
}
