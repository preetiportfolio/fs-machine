# Finite State Machine
## A Typescript library to generate n states with n events

fs-machine is a typescript library to create finite state machine easily with type check safety

> A finite automaton (FA) is a 5-tuple (Q,Σ,q0,F,δ) where,
> Q is a finite set of states;
> Σ is a finite input alphabet;
> q0 ∈ Q is the initial state;
> F ⊆ Q is the set of accepting/final states; and
> δ:Q×Σ→Q is the transition function.
> For any element q of Q and any symbol σ∈Σ, we interpret δ(q,σ) as the state to which the FA
> moves, if it is in state q and receives the input σ.

## Features

- Easy to use
- Type Safety Checks
- Independednt Events with the use of Async functionality

## Tech

fs-machine uses TypeScript and Mocha for unit testing

## Installation

fs-machine  requires [Node.js](https://nodejs.org/) v10+ to run.

Install the package using npm.

```sh
npm install fs-machine-ts-lib
```
