import xs from 'xstream'
import { run } from '@cycle/run'
import {
  label, input,
  h, p, makeDOMDriver
} from '@cycle/dom'
import bootstrap from '../bootstrap'
import copy from './copy'
import ColorSlider from './components/color-slider'
import EffectSelect from './components/effect-select'

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

  const colorSlider = ColorSlider({ DOM: sources.DOM })
  const colorSliderRedDOM$ = colorSlider.DOM // red component DOM
  const redValue$ = colorSlider.red // red value

  const effectSelect = EffectSelect({ DOM: sources.DOM })
  const esD$ = effectSelect.DOM
  const esV$ = effectSelect.val
  console.log(effectSelect, esD$, esV$)

  const wheelCount$ = sources.DOM
    .select('[name=wheel-count]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(22)

  const state$ = xs.combine(wheelCount$, redValue$, esV$)
    .map(([wheelCountV, redValue, esV]) =>
      [wheelCountV, redValue, esV])

  // view
  const vdom$ = xs.combine(state$, colorSliderRedDOM$, esD$)
    .map(([data, redSlider, eSelect]) => {
      const displayData = JSON.stringify(data)
      return h('section.bike-information',
        [
          title,
          eSelect,
          wheelCount,
          redSlider,
          p(`Values::  ${displayData}`)
        ])
    })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
