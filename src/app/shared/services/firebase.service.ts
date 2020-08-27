import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { LoginType, User } from 'nativescript-plugin-firebase';
import * as firebaseWebApi from 'nativescript-plugin-firebase/app';
import { from, Observable } from 'rxjs';

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

    getObservableList(url: string, handleSnapshot): Observable<any[]> {
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

    createItem(url: string, value: object): Observable<any> {
        return from(firebase.push(url, value).then(() => {
            console.log(`[*] Info : Your data was pushed by ${url} url!`);
        }, (error) => {
            console.log('[*] Error : While pushing your data to Firebase, with error: ' + error);
        }));
    }

    getItem(url: string, id: string): Observable<any> {
        return from(firebase.getValue(`/${url}/${id}`).then(res => ({ id, ...res.value })));
    }

    updateItem(url: string, itemId: string, value): Observable<any> {
        return from(firebase.update(`/${url}/${itemId}`, value).then((data) => {
            console.log(`[*] Info : Your  ${itemId} data was updated by ${url} url!`, data);
        }, (error) => {
            console.log('[*] Error : While updating your data to Firebase, with error: ' + error);
        }));
    }

    removeItem(url: string, itemId: string): Observable<any> {
        return from(firebase.remove(`/${url}/${itemId}`).then(() => {
            console.log(`[*] Info : Your  ${itemId} data was removed by ${url} url!`);
        }, (error) => {
            console.log('[*] Error : While removing your data to Firebase, with error: ' + error);
        }));
    }


    removeManyItems(url: string, itemIds: string[]): Observable<any> {
        return from(itemIds.map((id: string) => {
            // firebase api have no better solution
            firebase.remove(`/${url}/${id}`).then(() => {
                console.log(`[*] Info : Your  ${id} data was removed by ${url} url!`);
            }, (error) => {
                console.log('[*] Error : While removing your data to Firebase, with error: ' + error);
            });
        }));
    }

    // AUTH
    createUser(email: string, password: string): Observable<User> {
        return from(firebase.createUser({
            email: email, password: password
        })
        .then((user: User) => {
            this.updateItem('users', user.uid, user);
            this.sendEmailVerification(email);
            console.log({
                title: 'User created', message: 'uid: ' + user
            });
            return user;
        }, (errorMessage) => {
            console.log({
                title: 'No user created', message: errorMessage
            });
            return null;
        }));
    }

    sendEmailVerification(email: string): Observable<boolean> {
        return from(firebase.sendEmailVerification()
        .then((user: User) => {
            console.log({
                title: 'Verification Email sent', message: 'uid: ' + user
            });
            return true;
        }, (errorMessage) => {
            console.log({
                title: 'Verification Email sending error:', message: errorMessage
            });
            return false;
        }));
    }

    getCurrentUser(): Observable<User> {
        return from(firebase.getCurrentUser()
        .then((user: User) => user, error => {
            console.log('getCurrentUser error: ' + JSON.stringify(error));
            return null;
        }));
    }

    login(email: string, password: string): Observable<User> {
        return from(firebase.login({
            passwordOptions: {
                email: email, password: password
            }, type: LoginType.PASSWORD
        }).then((user: User) => {
            this.updateItem('users', user.uid, user);

            const db = firebaseWebApi.database();
            console.log(db);
            console.log('Login success: ' + JSON.stringify(user));
            return user;
        }, (error) => {
            console.log('Login error: ' + JSON.stringify(error));
            return null;
        }));
    }

    logout(): Observable<any> {
        return from(firebase.logout()
        .then(() => console.log('Logout OK'))
        .catch(error => console.log('Logout error: ' + JSON.stringify(error))));
    }
}
