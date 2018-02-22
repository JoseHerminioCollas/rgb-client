import xs from 'xstream'
import { run } from '@cycle/run'
import {
  label, input, div,
  h, p, makeDOMDriver
} from '@cycle/dom'
import bootstrap from '../bootstrap'
import copy from './copy'
import ComponentOne from './components/component-one'
import ColorSlider from './components/color-slider'

const title = h('header', { style: { color: '#333' } }, copy.title)

// a radio group to get the value of wheel count
const wheelCount = h('article', {}, [
  h('label', copy.effect, [
    h('div', { style: { fontWeight: 900 } }, [copy.effect.title]),
    label('', {}, [
      copy.effect.options.glow,
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 1 } }),
    ]),

    label('', {}, [
      copy.effect.options.chase,
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 2 } }),
    ]),

    label('', {}, [
      copy.effect.options.redBlue,
      input('.b', { attrs: { type: 'radio', name: 'wheel-count', value: 3 } }),
    ]),

  ]),
])
const colorSelect = div([
  div([
    copy.color.rangeSelect.red,
    input('.red', { attrs: { type: 'range', min: 0, max: 255, value: 200 } })
  ]),
])

bootstrap()
function main(sources) {

  const parentStream$ = xs.of(33)

  const c1 = ComponentOne({ b: 2, parentStream: parentStream$ })
  const cOneV$ = c1.v
  const sPeriod$ = c1.s

  const colorSlider = ColorSlider({ DOM: sources.DOM, parentStream: parentStream$ })
  const colorVal$ = colorSlider.v

  const colorSelectRed$ = colorSlider.red

  // intent actions const actions = intent(sources.DOM)
  const wheelCount$ = sources.DOM
    .select('[name=wheel-count]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(22)

  const a$ = xs.of(1)
  const state$ = xs.combine(wheelCount$, colorSelectRed$, a$, cOneV$, sPeriod$, colorVal$)
    .map(([wheelCountV, colorSelectRed, a, cOneV, sPeriod, colorVal]) =>
      [wheelCountV, colorSelectRed, a, cOneV, sPeriod, colorVal])

  // view
  const vdom$ = state$.map(data => {
    const displayData = JSON.stringify(data)
    return h('section.bike-information',
      [
        title,
        colorSelect,
        wheelCount,
        p(`Values::  ${displayData}`)
      ])
  })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
