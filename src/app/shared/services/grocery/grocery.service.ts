import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from "~/app/shared/services/firebase.service";
import { Grocery } from "~/app/shared/models/grocery";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GroceryService {
    path: string = 'groceries';

    constructor(private ngZone: NgZone, private firebaseService: FirebaseService) { }

    getList() {
        return this.firebaseService.getObservableList(this.path, this.handleSnapshot);
    }

    handleSnapshot(data: any) {
        return data
            ? Object.keys(data)
            .map(key => ({...{id: key}, ...data[key]}))
            .sort((a: Grocery, b: Grocery) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            : [];
    }

    create(item) {
        this.firebaseService.createItem(this.path, item);
    }

    remove(id: string) {
        this.firebaseService.removeItem(this.path, id);
    }

    update(id, item) {
        this.firebaseService.updateItem(this.path, id, item);
    }

    getItem(id: string): Observable<Grocery> {
        return this.firebaseService.getItem(this.path, id);
    }
}
