"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var signup_component_1 = require("./signup/signup.component");
var party_results_component_1 = require("./party-results/party-results.component");
var home_component_1 = require("./home/home.component");
var router_1 = require("@angular/router");
var routes = [
    {
        path: "signup",
        component: signup_component_1.SignupComponent
    },
    {
        path: "parties",
        component: party_results_component_1.PartyResultsComponent
    },
    {
        path: "",
        component: home_component_1.HomeComponent
    },
];
console.log("routes");
console.log(routes);
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
