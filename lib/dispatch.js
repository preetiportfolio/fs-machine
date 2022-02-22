"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatcherAsync = exports.dispatcher = void 0;
const types_1 = require("./types");
function dispatcher(init, transitions, opts) {
    let state = init;
    const getState = () => state;
    const invalid = (event) => {
        if (opts.throw === false)
            return false;
        throw new types_1.InvalidTransition(event, state);
    };
    const dispatch = (event) => {
        const fromMap = transitions.get(event);
        if (!fromMap)
            return invalid(event);
        const transition = fromMap.get(state);
        if (!transition)
            return invalid(event);
        const from = state;
        state = transition.to;
        transition.cb(from, event, transition.to);
        return true;
    };
    return { dispatch, getState };
}
exports.dispatcher = dispatcher;
function dispatcherAsync(init, transitions, opts) {
    let state = init;
    const getState = () => state;
    const invalid = (event) => {
        if (opts.throw === false)
            return false;
        throw new types_1.InvalidTransition(event, state);
    };
    const dispatch = (event) => __awaiter(this, void 0, void 0, function* () {
        const fromMap = transitions.get(event);
        if (!fromMap)
            return invalid(event);
        const transition = fromMap.get(state);
        if (!transition)
            return invalid(event);
        const from = state;
        state = transition.to;
        yield transition.cb(from, event, transition.to);
        return true;
    });
    return { dispatch, getState };
}
exports.dispatcherAsync = dispatcherAsync;
