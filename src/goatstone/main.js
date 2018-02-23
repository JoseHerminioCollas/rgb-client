import xs from 'xstream'
import { run } from '@cycle/run'
import {
  h, p, makeDOMDriver
} from '@cycle/dom'
import bootstrap from '../bootstrap'
import copy from './copy'
import ColorSlider from './components/color-slider'
import EffectSelect from './components/effect-select'

const title = h('header', { style: { color: '#333' } }, copy.title)

bootstrap()
function main(sources) {

  const colorSlider = ColorSlider({ DOM: sources.DOM })
  const colorSliderRedDOM$ = colorSlider.DOM // red component DOM
  const redValue$ = colorSlider.red // red value

  const effectSelect = EffectSelect({ DOM: sources.DOM, copy })
  const effectSelectVDOM$ = effectSelect.DOM
  const effectSelectValue$ = effectSelect.val

  const state$ = xs.combine(redValue$, effectSelectValue$)
    .map(([redValue, esV]) =>
      [redValue, esV])

  const vdom$ = xs.combine(state$, colorSliderRedDOM$, effectSelectVDOM$)
    .map(([data, redSlider, effectSelectVDOM]) => {
      const displayData = JSON.stringify(data)
      return h('section.bike-information',
        [
          title,
          effectSelectVDOM,
          redSlider,
          p(`Values::  ${displayData}`)
        ])
    })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
