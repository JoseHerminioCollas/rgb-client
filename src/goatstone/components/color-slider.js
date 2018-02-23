/*
 ColorSlider : a component for selecting a color valule 0 - 255
*/
import xs from 'xstream'
import { h, div, input } from '@cycle/dom'

function ColorSlider(sources) {
  const className = '.rangeSlider'
  const newValue$ = sources.DOM.select(className)
    .events('input')
    .map(ev => ev.target.value)
    .startWith(100)

  const props$ = xs.of({
    label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150
  })
  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        label: 'Color',
        unit: '',
        min: 0,
        value: val,
        max: 255
      }))
      .startWith(props)
    )
    .flatten()
    .remember()

  const vdom$ = state$.map(({ label, min, max, value }) =>
    h('div', {}, [div([
      div([
        label, ' ', value,
        input(className, { attrs: { type: 'range', min, max, value } })
      ]),
    ])])
  )

  return {
    value: newValue$,
    DOM: vdom$
  }
}

export default ColorSlider
