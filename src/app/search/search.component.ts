import { Component, OnInit } from "@angular/core";
import { capitalizationType, inputType, prompt, PromptOptions, PromptResult } from "tns-core-modules/ui/dialogs";
import { UserService } from "~/app/shared/services/user/user.service";
import { Observable } from "rxjs";
import { User } from "nativescript-plugin-firebase";


@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    email = 'ddseliverstov@gmail.com';
    password = 'TranE193';
    user$: Observable<User>;


    constructor(public userService: UserService) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void { }

    displayPromptDialog() {
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
    }

    createUser() {
        console.log('createUser');
        this.userService.createUser(this.email, this.password)
    }

    login() {
        console.log('login');
        this.user$ = this.userService.login(this.email, this.password)
    }

    logout() {
        this.userService.logout();
    }
}
