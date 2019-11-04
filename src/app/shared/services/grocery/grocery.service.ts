import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";
import { Grocery } from "~/app/shared/models/grocery";
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
    providedIn: 'root'
})
export class GroceryService {

    constructor(private ngZone: NgZone) {
    }

    getGroceries(): Observable<Grocery[]> {
        return new Observable((observer: any) => {
            let path = 'groceries';
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
            ? Object.keys(data).map(key => ({...{id: key}, ...data[key]}))
            : [];
    }
}
