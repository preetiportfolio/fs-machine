import { Callback, TransitionMap } from "./types";
export declare function transitionhelper<IState extends string, IEvent extends string, ICallback = Callback<IState, IEvent>>(name?: string): {
    transitions: TransitionMap<IState, IEvent, ICallback>;
    transition: (from: IState, event: IEvent, to: IState, cb?: ICallback | undefined) => void;
};
