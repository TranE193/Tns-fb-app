import { Injectable, NgZone } from '@angular/core';
import * as firebase from "nativescript-plugin-firebase";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private ngZone: NgZone) { }

    initFirebase() {
        firebase.init().then(() => console.log("firebase.init done"),
            (error) => console.log("firebase.init error: " + error));
    }

    createItem(url: string, value: object) {
        firebase.push(url, value).then(() => {
            console.log(`[*] Info : Your data was pushed by ${url} url!`);
        }, (error) => {
            console.log("[*] Error : While pushing your data to Firebase, with error: " + error);
        });
    }

    // getList(url:string): [] {
    //
    //
    //     var a = firebase.query(
    //         this.onQueryEvent,
    //         `/${url}`,
    //         {
    //             // set this to true if you want to check if the value exists or just want the event to fire once
    //             // default false, so it listens continuously.
    //             // Only when true, this function will return the data in the promise as well!
    //             singleEvent: true,
    //             // order by company.country
    //             orderBy: {
    //                 type: firebase.QueryOrderByType.CHILD,
    //                 value: 'createdAt' // mandatory when type is 'child'
    //             },
    //             // ranges: [
    //             //     {
    //             //         type: firebase.QueryRangeType.START_AT,
    //             //         value: 1999
    //             //     },
    //             //     {
    //             //         type: firebase.QueryRangeType.END_AT,
    //             //         value: 2000
    //             //     }
    //             // ],
    //             limit: {
    //                 type: firebase.QueryLimitType.LAST,
    //                 value: 5
    //             }
    //         }
    //     ).then(result => result);
    //     console.log('a', a);
    //     return [];
    // }
    //
    // onQueryEvent(result) {
    //     // note that the query returns 1 match at a time
    //     // in the order specified in the query
    //     console.log('log', result);
    //     if (!result.error) {
    //         console.log("Event type: " + result.type);
    //         console.log("Key: " + result.key);
    //         console.log("Value: " + JSON.stringify(result.value)); // a JSON object
    //         console.log("Children: " + JSON.stringify(result.children)); // an array, added in plugin v 8.0.0
    //     }
    //     return result;
    // };

    getObservableList(url: string, handleSnapshot): Observable<any> {
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

    updateItem(url: string, itemId: string, value) {
        firebase.update(`/${url}/${itemId}`, value).then(() => {
            console.log(`[*] Info : Your  ${itemId} data was updated by ${url} url!`);
        }, (error) => {
            console.log("[*] Error : While updating your data to Firebase, with error: " + error);
        });
    }

    removeItem(url: string, itemId: string) {
        firebase.remove(`/${url}/${itemId}`).then(() => {
            console.log(`[*] Info : Your  ${itemId} data was removed by ${url} url!`);
        }, (error) => {
            console.log("[*] Error : While removing your data to Firebase, with error: " + error);
        });
    }
}
