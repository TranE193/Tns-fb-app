import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from '~/app/shared/services/firebase.service';
import { Grocery } from '~/app/shared/models/grocery';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GroceryService {
    path: string = 'groceries';

    constructor(private ngZone: NgZone, private firebaseService: FirebaseService) { }

    getList(): Observable<Grocery[]> {
        return this.firebaseService.getObservableList(this.path, this.handleSnapshot);
    }

    handleSnapshot(data: any) {
        return data ? Object.keys(data)
        .map(key => ({ ...{ id: key }, ...data[key] }))
        .sort((a: Grocery, b: Grocery) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) : [];
    }

    create(item: Grocery): Observable<Grocery> {
        return this.firebaseService.createItem(this.path, item);
    }

    remove(id: string): Observable<Grocery> {
        return this.firebaseService.removeItem(this.path, id);
    }

    removeMany(ids: string[]): Observable<Grocery[]> {
        return this.firebaseService.removeManyItems(this.path, ids);
    }

    update(item: Grocery): Observable<Grocery> {
        return this.firebaseService.updateItem(this.path, item.id, item);
    }

    upsert(item: Grocery): Observable<Grocery> {
        return !item.id ? this.create(item) : this.update(item);
    }

    getItem(id: string): Observable<Grocery> {
        return this.firebaseService.getItem(this.path, id);
    }
}
