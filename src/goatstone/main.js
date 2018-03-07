import xs from 'xstream'
import { run } from '@cycle/run'
import { h, p, makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import bootstrap from '../bootstrap'
import copy from './copy'
import EffectSelect from './components/effect-select'
import ComponentOne from './components/component-one'
import ColorPicker from './components/color-picker'

const titleVDOM = h('header', { style: { color: '#333' } }, copy.title)

bootstrap()
function main(sources) {

  const url = 'http://localhost:3000/rgb/light/set/glow'
  const user$ = sources.HTTP
    .select('users')
    .flatten()
    .map(res => `${res.text} xxx`)

  const click$ = sources.DOM.select('[data-id=component-one]').events('click')
  const request$ = click$
    .map(() =>
      ({
        url,
        category: 'users',
        method: 'POST'
      }))
    .startWith({
      url,
      category: 'users',
      method: 'POST'
    })

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
    componentOneValue$,
    colorPickerValue$,
    user$,
  ).map(([
    effectSelectValue,
    componentOneValue,
    colorPickerValue,
    user,
  ]) =>
    [
      effectSelectValue,
      componentOneValue,
      colorPickerValue,
      user,
    ])

  const vdom$ = xs.combine(
    state$,
    effectSelectVDOM$,
    componentOneVDOM$,
    colorPickerVDOM$,
  ).map(([
    data,
    effectSelectVDOM,
    componentOneVDOM,
    colorPickerVDOM,
  ]) => {
    const displayData = JSON.stringify(data)
    return h('section',
      [
        titleVDOM,
        effectSelectVDOM,
        componentOneVDOM,
        colorPickerVDOM,
        p(`:::  ${displayData} :::`)
      ])
  })
  return { DOM: vdom$, HTTP: request$ }
}
const drivers = {
  HTTP: makeHTTPDriver(),
  DOM: makeDOMDriver('#app-container')
}
run(main, drivers)
