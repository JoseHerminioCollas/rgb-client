import xs from 'xstream'
import { run } from '@cycle/run'
import {
  h, p, makeDOMDriver
} from '@cycle/dom'
import bootstrap from '../bootstrap'
import copy from './copy'
import ColorSlider from './components/color-slider'
import EffectSelect from './components/effect-select'
import ComponentOne from './components/component-one'

const titleVDOM = h('header', { style: { color: '#333' } }, copy.title)

bootstrap()
function main(sources) {

  const redColorSlider = ColorSlider({ DOM: sources.DOM })
  const redColorSliderVDOM$ = redColorSlider.DOM
  const redColorSliderValue$ = redColorSlider.value

  const effectSelect = EffectSelect({ DOM: sources.DOM, copy })
  const effectSelectVDOM$ = effectSelect.DOM
  const effectSelectValue$ = effectSelect.val

  const componentOne = ComponentOne({ DOM: sources.DOM })
  const componentOneVDOM$ = componentOne.DOM
  const componentOneValue$ = componentOne.value

  const state$ = xs.combine(redColorSliderValue$, effectSelectValue$, componentOneValue$)
    .map(([redColorSliderValue, effectSelectValue, componentOneValue]) =>
      [redColorSliderValue, effectSelectValue, componentOneValue])

  const vdom$ = xs.combine(state$, redColorSliderVDOM$, effectSelectVDOM$, componentOneVDOM$)
    .map(([data, redColorSliderVDOM, effectSelectVDOM, componentOneVDOM]) => {
      const displayData = JSON.stringify(data)
      return h('section.bike-information',
        [
          titleVDOM,
          effectSelectVDOM,
          componentOneVDOM,
          redColorSliderVDOM,
          p(`Values::  ${displayData}`)
        ])
    })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
