import { Component, OnInit } from "@angular/core";
import {initFirebase} from "~/app/shared/firebase.common";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    ngOnInit() {
        initFirebase();
    }
}
