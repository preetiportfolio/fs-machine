import { expect } from 'chai'
import { createMachine } from '../statemachine'

type State = 'S0' | 'S1' | 'S2'

type Event = '0' | '1'

const stMachine = createMachine<State, Event>('S0', { throw: false }).transition(
  ['S0', '1', 'S1'],
  ['S1', '0', 'S2'],
  ['S2', '1', 'S2'],
  ['S2', '0', 'S1']
)

type Test = [string, Event, State | false]

const tests: Test[] = [
  ['Initial State check', '0', false],
  ['cannot go in S0 when already S0', '0', false],
  ['S1 when there is event with 1', '1', 'S1'],
  ['S2 when there is event with 0', '0', 'S2'],
  ['Stays in S2 with event 1', '1', 'S2'],
]

describe('transition tests', () => {
  const machine = stMachine.create()

  for (const [msg, event, expected] of tests) {
    it(`it will do ${msg}`, () => {
      const initial = machine.getState()
      const result = machine.dispatch(event)
      const actual = machine.getState()
      expect(result, `transition allowed from State. ${initial} with Event.${event}`).to.equal(
        expected !== false,
      )
      expect(actual, 'correct end state').to.equal(expected === false ? initial : expected)
    })
  }
})

describe('functionality tests', () => {
  it('will create two independant states from one machine', () => {
    const first = stMachine.create()
    const second = stMachine.create()

    first.dispatch('1')
    expect(first.getState()).to.equal('S1')
    expect(second.getState()).to.equal('S0')
  })

  it('will throw on invalid transition', () => {
    const one = stMachine.create({ throw: true })
    const badTransition = () => one.dispatch('0')

    expect(badTransition).to.throw()
  })
})