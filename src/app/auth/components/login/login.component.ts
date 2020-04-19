import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { User } from 'nativescript-plugin-firebase';

interface LoginForm {
    email: string,
    password: string,
    confirmPassword?: string
}

@Component({
    selector: 'ns-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: LoginForm = {
        email: '', password: ''
    };
    isRegisterMode: boolean;

    @Input() currentUser: User;
    @Output() login = new EventEmitter();
    @Output() register = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onTextEmailChange(args) {
        let textField = <TextField>args.object;
        this.loginForm.email = textField.text;
    }

    onTextPasswordChange(args) {
        let textField = <TextField>args.object;
        this.loginForm.password = textField.text;
    }

    onTextConfirmPasswordChange(args) {
        let textField = <TextField>args.object;
        this.loginForm.confirmPassword = textField.text;
    }

    onLogin() {
        console.log(this.loginForm);
        if(!this.isRegisterMode) {
            this.login.emit(this.loginForm);
        } else {
            if(this.loginForm.password === this.loginForm.confirmPassword) {
                this.register.emit(this.loginForm);
            } else {
                console.log('Passwords not confirmed');
            }
        }
    }

}
