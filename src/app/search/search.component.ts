import { Component, OnInit } from "@angular/core";
import { capitalizationType, inputType, prompt, PromptOptions, PromptResult } from "tns-core-modules/ui/dialogs";


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

    displayPromptDialog() {
        // >> prompt-dialog-code
        /*
        import {
            prompt,
            PromptResult,
            PromptOptions,
            inputType,
            capitalizationType
        } from "tns-core-modules/ui/dialogs";
        */
        let options: PromptOptions = {
            title: "Hey There",
            // defaultText: " Enter your mood ",
            message: "How you doin'",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            neutralButtonText: "Neutral",
            cancelable: true,
            inputType: inputType.text, // email, number, text, password, or email
            capitalizationType: capitalizationType.sentences // all. none, sentences or words
        };

        prompt(options).then((result: PromptResult) => {
            console.log("Hello, " + result.text);
        });
        // << prompt-dialog-code
    }
}
