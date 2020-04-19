import { Component, OnInit } from '@angular/core';
import { capitalizationType, inputType, prompt, PromptOptions, PromptResult } from 'tns-core-modules/ui/dialogs';
import { UserService } from '~/app/shared/services/user/user.service';
import { Observable } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';
import { select, Store } from '@ngrx/store';
import { RootPartialState } from '~/app/+state/root.reducer';
import { rootQuery } from '~/app/+state/root.selectors';


@Component({
    selector: 'Search', templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    user$: Observable<User>;


    constructor(public userService: UserService, private store: Store<RootPartialState>) { }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(rootQuery.getCurrentUser));
    }

    displayPromptDialog() {
        let options: PromptOptions = {
            title: 'Hey There', // defaultText: " Enter your mood ",
            message: 'How you doin\'', okButtonText: 'OK', cancelButtonText: 'Cancel', neutralButtonText: 'Neutral',
            cancelable: true,
            inputType: inputType.text, // email, number, text, password, or email
            capitalizationType: capitalizationType.sentences // all. none, sentences or words
        };

        prompt(options).then((result: PromptResult) => {
            console.log('Hello, ' + result.text);
        });
    }
}
