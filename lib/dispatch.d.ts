import { AsyncCallback, Callback, Options, TransitionMap } from './types';
export declare function dispatcher<IState extends string, IEvent extends string>(init: IState, transitions: TransitionMap<IState, IEvent, Callback<IState, IEvent>>, opts: Options): {
    dispatch: (event: IEvent) => boolean;
    getState: () => IState;
};
export declare function dispatcherAsync<IState extends string, IEvent extends string>(init: IState, transitions: TransitionMap<IState, IEvent, AsyncCallback<IState, IEvent>>, opts: Options): {
    dispatch: (event: IEvent) => Promise<boolean>;
    getState: () => IState;
};
