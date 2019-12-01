import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "~/app/shared/services/firebase.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    // create new user actions (getCurrent + login and save to state)

    constructor(private fs: FirebaseService) {
        fs.initFirebase();
    }

    ngOnInit() { }
}
