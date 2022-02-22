"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitionhelper = void 0;
function transitionhelper(name) {
    const transitions = new Map();
    const transition = (from, event, to, cb) => {
        if (!transitions.has(event))
            transitions.set(event, new Map());
        const fromMap = transitions.get(event);
        if (fromMap.has(from)) {
            throw new Error(`Machine is already set for ${name}::${from} --> ${to}`);
        }
        fromMap.set(from, { to, cb: cb !== null && cb !== void 0 ? cb : nothing });
        return;
    };
    return { transitions, transition };
}
exports.transitionhelper = transitionhelper;
function nothing() { }
