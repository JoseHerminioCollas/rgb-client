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

  // color components need distinct selectors (DOM) in order to create distinct values
  const redColorSlider = ColorSlider({ DOM: sources.DOM, copy: { label: `Red` }, selector: 'red-select' })
  const redColorSliderVDOM$ = redColorSlider.DOM
  const redColorSliderValue$ = redColorSlider.value

  const greenColorSlider = ColorSlider({ DOM: sources.DOM, copy: { label: 'Green' }, selector: 'green-select' })
  const greenColorSliderVDOM$ = greenColorSlider.DOM
  const greenColorSliderValue$ = greenColorSlider.value

  const effectSelect = EffectSelect({ DOM: sources.DOM, copy })
  const effectSelectVDOM$ = effectSelect.DOM
  const effectSelectValue$ = effectSelect.val

  const componentOne = ComponentOne({ DOM: sources.DOM })
  const componentOneVDOM$ = componentOne.DOM
  const componentOneValue$ = componentOne.value

  const state$ = xs.combine(
    redColorSliderValue$, effectSelectValue$, componentOneValue$, greenColorSliderValue$)
    .map(([redColorSliderValue, effectSelectValue, componentOneValue, greenColorSliderValue]) =>
      [redColorSliderValue, effectSelectValue, componentOneValue, greenColorSliderValue])

  const vdom$ = xs.combine(
    state$, redColorSliderVDOM$, effectSelectVDOM$, componentOneVDOM$, greenColorSliderVDOM$)
    .map(([data, redColorSliderVDOM, effectSelectVDOM, componentOneVDOM, greenColorSliderVDOM]) => {
      const displayData = JSON.stringify(data)
      return h('section.bike-information',
        [
          titleVDOM,
          effectSelectVDOM,
          componentOneVDOM,
          redColorSliderVDOM,
          greenColorSliderVDOM,
          p(`Values::  ${displayData}`)
        ])
    })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
