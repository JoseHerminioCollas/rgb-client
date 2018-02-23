import xs from 'xstream'
import { run } from '@cycle/run'
import {
  label, input,
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

bootstrap()
function main(sources) {

  const parentStream$ = xs.of(33)

  const c1 = ComponentOne({ b: 2, parentStream: parentStream$ })
  const cOneV$ = c1.v
  const sPeriod$ = c1.s

  const colorSlider = ColorSlider({ DOM: sources.DOM })
  const colorSliderRedDOM$ = colorSlider.DOM
  const colorSelectRed$ = colorSlider.red

  // intent actions const actions = intent(sources.DOM)
  const wheelCount$ = sources.DOM
    .select('[name=wheel-count]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(22)

  const state$ = xs.combine(wheelCount$, colorSelectRed$, cOneV$, sPeriod$)
    .map(([wheelCountV, colorSelectRed, cOneV, sPeriod]) =>
      [wheelCountV, colorSelectRed, cOneV, sPeriod])

  // view
  const vdom$ = xs.combine(state$, colorSliderRedDOM$).map(([data, redSlider]) => {
    const displayData = JSON.stringify(data)
    return h('section.bike-information',
      [
        title,
        wheelCount,
        redSlider,
        p(`Values::  ${displayData}`)
      ])
  })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
