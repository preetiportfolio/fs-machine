export declare type Callback<IState extends string, IEvent extends string> = (from: IState, event: IEvent, to: IState) => void;
export declare type AsyncCallback<IState extends string, IEvent extends string> = (from: IState, event: IEvent, to: IState) => void | Promise<void>;
export declare type Options = {
    name?: string;
    throw?: boolean;
};
export declare type TransitionMap<IState extends string, IEvent extends string, ICallback = Callback<IState, IEvent>> = Map<IEvent, Map<IState, {
    to: IState;
    cb: ICallback;
}>>;
export declare class InvalidTransition extends Error {
    constructor(event: string, from: string);
}
