import { AsyncCallback, Options } from './types';
declare type OverrideOptions<IState extends string> = Options & {
    init?: IState;
};
export declare function createMachine<IState extends string, IEvent extends string>(init: IState, opts?: Options): {
    transition: (from: IState, event: IEvent, to: IState, cb?: import("./types").Callback<IState, IEvent> | undefined) => void;
    create: (override?: OverrideOptions<IState> | undefined) => {
        dispatch: (event: IEvent) => boolean;
        getState: () => IState;
    };
};
export declare function createMachineAsync<IState extends string, IEvent extends string>(init: IState, opts?: Options): {
    transition: (from: IState, event: IEvent, to: IState, cb?: AsyncCallback<IState, IEvent> | undefined) => void;
    create: (override?: OverrideOptions<IState> | undefined) => {
        dispatch: (event: IEvent) => Promise<boolean>;
        getState: () => IState;
    };
};
export {};
