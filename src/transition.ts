import { Callback, TransitionMap } from './types';

export type Transition<IState extends string, IEvent extends string> =
    | [IState, IEvent, IState, Callback<IState, IEvent>]
    | [IState, IEvent, IState]

export function transitionhelper<IState extends string, IEvent extends string, ICallback = Callback<IState, IEvent>
>(name?: string) {
    const transitions: TransitionMap<IState, IEvent, ICallback> = new Map();
    const transition = (...transition: Transition<IState, IEvent>[]) => {
        for (const [from, event, to, cb] of transition) {
            if (!transitions.has(event)) transitions.set(event, new Map())
            const fromMap = transitions.get(event)!

            if (fromMap.has(from)) {
                throw new Error(`Handler already set for ${name}::${from} --> ${to}`)
            }

            fromMap.set(from, { to, cb: cb ?? (nothing as any) })
        }
    }

    return { transitions, transition };
}

function nothing() { }
