import { Injectable } from '@angular/core';
import { FirebaseService } from '~/app/shared/services/firebase.service';
import { Observable } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firebaseService: FirebaseService) { }

    createUser({ email, password }): Observable<User> {
        return this.firebaseService.createUser(email, password);
    }

    sendEmailVerification(email: string): Observable<boolean> {
        return this.firebaseService.sendEmailVerification(email);
    }

    getCurrentUser(): Observable<User> {
        return this.firebaseService.getCurrentUser();
    }

    login({ email, password }): Observable<User> {
        return this.firebaseService.login(email, password);
    }

    logout(): Observable<any> {
        return this.firebaseService.logout();
    }
}
