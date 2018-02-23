/*
 ColorSlider : a component for selecting a color valule 0 - 255
*/
import xs from 'xstream'
import { h, div, input } from '@cycle/dom'

function ColorSlider(sources) {
  // pass the specific DOM element
  // sources.redSelectDOM sources.DOM
  const colorSelectRed$ = sources.DOM.select('.red')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(0)

  const state$ = xs.of(1111)
  const colorSelect = div([
    div([
      'xxx',
      input('.red', { attrs: { type: 'range', min: 0, max: 255, value: 200 } })
    ]),
  ])

  const vdom$ = state$.map(state =>
    h('div', {}, ['vdom', state, colorSelect])
  )

  const sinks = {
    red: colorSelectRed$,
    DOM: vdom$
  }
  return sinks
}

export default ColorSlider
