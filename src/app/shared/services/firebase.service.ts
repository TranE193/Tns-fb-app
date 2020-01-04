import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { LoginType, User } from 'nativescript-plugin-firebase';
import { from, Observable } from 'rxjs';
import { Grocery } from '~/app/shared/models/grocery';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private ngZone: NgZone) { }

    initFirebase() {
        firebase.init({
            onAuthStateChanged: data => { // optional but useful to immediately re-logon the user when they re-visit your app
                console.log(data.loggedIn ? 'Logged in to firebase' : 'Logged out from firebase');
                if(data.loggedIn) {
                    console.log('user\'s email address: ' + (data.user.email ? data.user.email : 'N/A'));
                }
            }
        })
        .then((data) => console.log('firebase.init done', data), (error) => console.log('firebase.init error: ' + error));
    }

    createItem(url: string, value: object) {
        firebase.push(url, value).then(() => {
            console.log(`[*] Info : Your data was pushed by ${url} url!`);
        }, (error) => {
            console.log('[*] Error : While pushing your data to Firebase, with error: ' + error);
        });
    }

    getObservableList(url: string, handleSnapshot): Observable<Grocery[]> {
        return new Observable((observer: any) => {
            let onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    let results = handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${url}`);
        });
    }

    updateItem(url: string, itemId: string, value) { //todo: convert to observable
        firebase.update(`/${url}/${itemId}`, value).then((data) => {
            console.log(`[*] Info : Your  ${itemId} data was updated by ${url} url!`, data);
        }, (error) => {
            console.log('[*] Error : While updating your data to Firebase, with error: ' + error);
        });
    }

    removeItem(url: string, itemId: string) {
        firebase.remove(`/${url}/${itemId}`).then(() => {
            console.log(`[*] Info : Your  ${itemId} data was removed by ${url} url!`);
        }, (error) => {
            console.log('[*] Error : While removing your data to Firebase, with error: ' + error);
        });
    }

    getItem(url: string, id: string): Observable<Grocery> {
        return from(firebase.getValue(`/${url}/${id}`).then(res => ({ id, ...res.value })));
    }

    // AUTH
    createUser(email: string, password: string) {
        firebase.createUser({
            email: email, password: password
        })
        .then((user) => {
            console.log({
                title: 'User created', message: 'uid: ' + user, okButtonText: 'Nice!'
            });
        }, (errorMessage) => {
            console.log({
                title: 'No user created', message: errorMessage, okButtonText: 'OK, got it'
            });
        });
    }

    getCurrentUser(): Observable<any> {
        // return from(firebase.getCurrentUser(`/${url}/${id}`).then(res => ({id, ...res.value})))
        return from(firebase.getCurrentUser()
        .then((user: User) => user, error => console.log('getCurrentUser error: ' + JSON.stringify(error))));
    }

    login(email: string, password: string): Observable<any> {
        return from(firebase.login({
            passwordOptions: {
                email: email, password: password
            }, type: LoginType.PASSWORD
        }).then((user: User) => {
            console.log('Login success: ' + JSON.stringify(user));
            return user;
        }, (error) => console.log('Login error: ' + JSON.stringify(error))));
    }

    logout(): Observable<any> {
        return from(firebase.logout()
        .then(() => console.log('Logout OK'))
        .catch(error => console.log('Logout error: ' + JSON.stringify(error))));
    }
}
