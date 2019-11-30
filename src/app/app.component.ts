import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "~/app/shared/services/firebase.service";
import { Observable } from "rxjs";
import { User } from "nativescript-plugin-firebase";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    currentUser$: Observable<User>;

    constructor(private fs: FirebaseService) {
        fs.initFirebase();
    }

    ngOnInit() { }
}
