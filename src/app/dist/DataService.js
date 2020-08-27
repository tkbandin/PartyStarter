"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.apiBaseUrl = "http://localhost:3000/api";
    }
    DataService.prototype._getUrl = function (endpointUrl) {
        return this.apiBaseUrl + endpointUrl;
    };
    DataService.prototype.getParties = function () {
        var url = this._getUrl("/parties");
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) {
            console.log({ response: response });
            return response;
        });
    };
    DataService.prototype.addOneGoing = function (id) {
        var url = this._getUrl("/parties/" + id + "/going");
        return this.http
            .put(url, {})
            .toPromise()
            .then(function (response) { });
    };
    DataService.prototype.minusOneGoing = function (id) {
        var url = this._getUrl("/parties/" + id + "/going");
        return this.http["delete"](url, {})
            .toPromise()
            .then(function (response) { });
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
