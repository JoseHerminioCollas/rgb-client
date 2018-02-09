import xs from 'xstream'
import { run } from '@cycle/run'
import { label, input,
  h, h3, p, makeDOMDriver } from '@cycle/dom'
import bootstrap from '../bootstrap'

// a button to reset the form
const reset = input('.reset', { attrs: { type: 'button', value: 'reset' } })

const title = h3({ style: { color: '#333' } }, 'Bike Information')

// a name input
const name = input(
  {
    attrs:
      { type: 'text', name: 'name', value: '', 'data-name': 'name' },
    style:
      { margin: '2px 6px' }
  }
)
const nameLabel = label(
  {
    style:
      { display: 'inline-block' }
  },
  ['Name', name]
)
// a radio group to get the value of wheel count
const wheelCount = h('article', {}, [
  h('label', 'Wheel Count', [
    h('div', { style: { fontWeight: 900 } }, ['Wheel Count']),
    label('', {}, [
      'One',
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 1 } }),
    ]),

    label('', {}, [
      'Two',
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 2 } }),
    ]),

    label('', {}, [
      'Three',
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 3 } }),
    ]),

  ]),
])

bootstrap()
function main(sources) {

  // intent actions const actions = intent(sources.DOM)
  const wheelCount$ = sources.DOM
    .select('[name=wheel-count]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith('')
  const name$ = sources.DOM
    .select('[data-name=name]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith('')
  const reset$ = sources.DOM
    .select('.reset')
    .events('click')
    .mapTo(1).startWith(0)

  // state$ = model(actions)
  const state$ = xs.combine(reset$, name$, wheelCount$)
    .map(m => {
      console.log('state', m)
      return m
    })

  // view
  const vdom$ = state$.map(data => {
    const displayData = JSON.stringify(data)
    return h('section.bike-information',
      [
        title,
        nameLabel,
        wheelCount,
        reset,
        p(`Values:  ${displayData}`)
      ])
  })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
