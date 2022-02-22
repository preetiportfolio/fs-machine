export type Callback<IState extends string, IEvent extends string> = (from: IState, event: IEvent, to: IState) => void;

export type AsyncCallback<IState extends string, IEvent extends string> = (
    from: IState,
    event: IEvent,
    to: IState,
) => void | Promise<void>;

export type Options = {
    name?: string;
    throw?: boolean;
};

export type TransitionMap<IState extends string, IEvent extends string, ICallback = Callback<IState, IEvent>> = Map<
    IEvent,
    Map<IState, { to: IState; cb: ICallback }>
>;

export class InvalidTransition extends Error {
    constructor(event: string, from: string) {
        super();
        this.message = `Invalid Transitions event "$(event)" from state "$(old)"`;
    }
}
