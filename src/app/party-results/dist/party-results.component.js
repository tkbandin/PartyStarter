"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PartyResultsComponent = exports.Party = void 0;
var core_1 = require("@angular/core");
var Party = /** @class */ (function () {
    function Party() {
        this.isAttending = false;
    }
    return Party;
}());
exports.Party = Party;
var PartyResultsComponent = /** @class */ (function () {
    function PartyResultsComponent(dataService) {
        this.dataService = dataService;
    }
    PartyResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getParties().then(function (parties) {
            console.log("Got parties:");
            console.log(parties);
            _this.parties = parties;
        });
    };
    PartyResultsComponent.prototype.addGoing = function (party) {
        console.log(party);
        party.going = party.going + 1;
        party.isAttending = true;
        this.dataService.addOneGoing(party._id);
    };
    PartyResultsComponent.prototype.removeGoing = function (party) {
        console.log(party);
        party.going = party.going - 1;
        party.isAttending = false;
        this.dataService.minusOneGoing(party._id);
    };
    PartyResultsComponent = __decorate([
        core_1.Component({
            selector: "app-party-results",
            templateUrl: "./party-results.component.html",
            styleUrls: ["./party-results.component.css"]
        })
    ], PartyResultsComponent);
    return PartyResultsComponent;
}());
exports.PartyResultsComponent = PartyResultsComponent;
