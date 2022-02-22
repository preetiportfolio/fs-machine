import { AsyncCallback, Callback, InvalidTransition, Options, TransitionMap } from './types';

export type Dispatcher<IState extends string, IEvent extends string> = {
    dispatch: (event: IEvent) => boolean
    getState: () => IState
}

export type DispatcherAsync<IState extends string, IEvent extends string> = {
    dispatch: (event: IEvent) => Promise<boolean>
    getState: () => IState
}

export function dispatcher<IState extends string, IEvent extends string>(
    init: IState,
    transitions: TransitionMap<IState, IEvent, Callback<IState, IEvent>>,
    opts: Options,
): Dispatcher<IState, IEvent> {
    let state = init;

    const getState = () => state;

    const invalid = (event: IEvent) => {
        if (opts.throw === false) return false;
        throw new InvalidTransition(event, state);
    };

    const dispatch = (event: IEvent) => {
        const fromMap = transitions.get(event);
        if (!fromMap) return invalid(event);

        const transition = fromMap.get(state);
        if (!transition) return invalid(event);

        const from = state;
        state = transition.to;
        transition.cb(from, event, transition.to);

        return true;
    };

    return { dispatch, getState };
}

export function dispatcherAsync<IState extends string, IEvent extends string>(
    init: IState,
    transitions: TransitionMap<IState, IEvent, AsyncCallback<IState, IEvent>>,
    opts: Options,
): DispatcherAsync<IState, IEvent> {
    let state = init;

    const getState = () => state;

    const invalid = (event: IEvent) => {
        if (opts.throw === false) return false;
        throw new InvalidTransition(event, state);
    };

    const dispatch = async (event: IEvent) => {
        const fromMap = transitions.get(event);
        if (!fromMap) return invalid(event);

        const transition = fromMap.get(state);
        if (!transition) return invalid(event);

        const from = state;
        state = transition.to;
        await transition.cb(from, event, transition.to);

        return true;
    };

    return { dispatch, getState };
}
