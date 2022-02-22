"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMachineAsync = exports.createMachine = void 0;
const dispatch_1 = require("./dispatch");
const transition_1 = require("./transition");
function createMachine(init, opts = {}) {
    const { transition, transitions } = (0, transition_1.transitionhelper)(opts.name);
    const create = (override) => {
        var _a;
        return (0, dispatch_1.dispatcher)((_a = override === null || override === void 0 ? void 0 : override.init) !== null && _a !== void 0 ? _a : init, transitions, override !== null && override !== void 0 ? override : opts);
    };
    return { transition, create };
}
exports.createMachine = createMachine;
function createMachineAsync(init, opts = {}) {
    const { transition, transitions } = (0, transition_1.transitionhelper)(opts.name);
    const create = (override) => {
        var _a;
        return (0, dispatch_1.dispatcherAsync)((_a = override === null || override === void 0 ? void 0 : override.init) !== null && _a !== void 0 ? _a : init, transitions, override !== null && override !== void 0 ? override : opts);
    };
    return { transition, create };
}
exports.createMachineAsync = createMachineAsync;
