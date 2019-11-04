import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "~/app/shared/services/firebase.service";


@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    constructor(private fs: FirebaseService) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
    }

    onButtonTap(): void {
        const date = new Date().toUTCString();


        this.fs.push('/ideas', {
            idea: {newIdea: "new_idea_0"},
            createdAt: date,
            id: Math.random().toString(36).substring(2) + Date.now().toString(36)
        })
    }
}
