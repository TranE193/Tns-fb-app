import {Component, OnInit} from "@angular/core";
import {push} from "~/app/shared/firebase.common";


@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    constructor() {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
    }

    onButtonTap(): void {
        const date = new Date().toUTCString();


        push('/ideas', {
            idea: {newIdea: "new_idea_0"},
            createdAd: date
        })
    }
}
