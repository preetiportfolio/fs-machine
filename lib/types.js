"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTransition = void 0;
class InvalidTransition extends Error {
    constructor(event, from) {
        super();
        this.message = `Invalid Transitions event "$(event)" from state "$(old)"`;
    }
}
exports.InvalidTransition = InvalidTransition;
