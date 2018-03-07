import xs from 'xstream'
import { run } from '@cycle/run'
import {
  h, p, makeDOMDriver
} from '@cycle/dom'
import bootstrap from '../bootstrap'
import copy from './copy'
import EffectSelect from './components/effect-select'
import ComponentOne from './components/component-one'
import ColorPicker from './components/color-picker'

const titleVDOM = h('header', { style: { color: '#333' } }, copy.title)

bootstrap()
function main(sources) {

  const colorPicker = ColorPicker({
    DOM: sources.DOM,
    initValues: [199, 199, 199]
  })
  const colorPickerVDOM$ = colorPicker.DOM
  const colorPickerValue$ = colorPicker.value

  const effectSelect = EffectSelect({ DOM: sources.DOM, copy })
  const effectSelectVDOM$ = effectSelect.DOM
  const effectSelectValue$ = effectSelect.val

  const componentOne = ComponentOne({ DOM: sources.DOM })
  const componentOneVDOM$ = componentOne.DOM
  const componentOneValue$ = componentOne.value

  const state$ = xs.combine(
    effectSelectValue$,
    componentOneValue$, colorPickerValue$)
    .map(([effectSelectValue,
      componentOneValue, colorPickerValue]) =>
      [effectSelectValue,
        componentOneValue, colorPickerValue])

  const vdom$ = xs.combine(
    state$, effectSelectVDOM$,
    componentOneVDOM$, colorPickerVDOM$)
    .map(([
      data,
      effectSelectVDOM,
      componentOneVDOM,
      colorPickerVDOM
    ]) => {
      const displayData = JSON.stringify(data)
      return h('section',
        [
          titleVDOM,
          effectSelectVDOM,
          componentOneVDOM,
          colorPickerVDOM,
          p(`Values::  ${displayData}`)
        ])
    })
  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
