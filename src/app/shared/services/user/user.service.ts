import { Injectable } from '@angular/core';
import { FirebaseService } from "~/app/shared/services/firebase.service";
import { Observable } from "rxjs";
import { User } from "nativescript-plugin-firebase";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firebaseService: FirebaseService) { }

    createUser(email: string, password: string) {
        this.firebaseService.createUser(email, password);
    }

    getCurrentUser(): Observable<User> {
        return this.firebaseService.getCurrentUser();
    }

    login(email: string, password: string): Observable<User> {
        return this.firebaseService.login(email, password);
    }

    logout() {
        this.firebaseService.logout();
    }
}
