import { Dispatcher, DispatcherAsync, dispatcher, dispatcherAsync } from './dispatch';
import { Transition, transitionhelper } from './transition';
import { AsyncCallback, Options } from './types';

export type Machine<IState extends string, IEvent extends string> = {
    transition: (...transition: Transition<IState, IEvent>[]) => Machine<IState, IEvent>
    create: (override?: OverrideOptions<IState>) => Dispatcher<IState, IEvent>
}

export type MachineAsync<IState extends string, IEvent extends string> = {
    transition: (...transition: Transition<IState, IEvent>[]) => MachineAsync<IState, IEvent>
    create: (override?: OverrideOptions<IState>) => DispatcherAsync<IState, IEvent>
}


type OverrideOptions<IState extends string> = Options & { init?: IState };

export function createMachine<IState extends string, IEvent extends string>(init: IState, opts: Options = {}) {
    const { transition, transitions } = transitionhelper<IState, IEvent>(opts.name)

    const create = (override?: OverrideOptions<IState>) => {
        return dispatcher(override?.init ?? init, transitions, override ?? opts);
    };

    const machine: Machine<IState, IEvent> = {
        transition: (...ts) => {
            transition(...ts)
            return machine
        },
        create,
    }

    return machine
}

export function createMachineAsync<IState extends string, IEvent extends string>(init: IState, opts: Options = {}) {
    const { transition, transitions } = transitionhelper<IState, IEvent, AsyncCallback<IState, IEvent>>(opts.name);
    const create = (override?: OverrideOptions<IState>) => {
        return dispatcherAsync(override?.init ?? init, transitions, override ?? opts);
    }

    const machine: MachineAsync<IState, IEvent> = {
        transition: (...ts) => {
            transition(...ts)
            return machine
        },
        create,
    }

    return { transition, create };
}
