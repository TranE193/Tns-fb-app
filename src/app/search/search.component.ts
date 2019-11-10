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


        // this.fs.updateItem('ideas', '-LtG-cWGUw5AlGZ_Yjyc', {idea: {amount: 333}})
        // this.fs.getList('ideas')
    }
}
