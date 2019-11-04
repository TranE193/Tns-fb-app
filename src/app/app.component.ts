import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "~/app/shared/services/firebase.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    constructor(private fs: FirebaseService) {
        fs.initFirebase()
    }

    ngOnInit() {
    }
}
