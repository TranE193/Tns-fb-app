import { Component, OnInit } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    constructor() {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        firebase.init({
                  // Optionally pass in properties for database, authentication and cloud messaging,
                  // see their respective docs.
                }).then(
                  () => {
                    console.log("firebase.init done");
                  },
                  error => {
                    console.log(`firebase.init error: ${error}`);
                  }
                );
    }

     onButtonTap(): void {
                 firebase.push('/ideas', {
                   idea: { newIdea: "new_idea_0"}
                 }).then((result) => {
                 console.log("[*] Info : Your data was pushed !");
                 }, (error) => {
               console.log("[*] Error : While pushing your data to Firebase, with error: " + error);
                 });
              }
}
