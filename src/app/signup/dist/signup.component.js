"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var SignupComponent = /** @class */ (function () {
    function SignupComponent() {
        this.submitted = false;
        this.$ctrl = this;
        // form.email.$error.email
        this.newSignup = {
            name: '',
            email: '',
            password: ''
        };
    }
    SignupComponent.prototype.onRegister = function (f) {
        console.log(f);
        console.log(this.newSignup);
        // We have data in this.newSignup
        // TODO: call off to DataService to create user
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.errors = {};
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
