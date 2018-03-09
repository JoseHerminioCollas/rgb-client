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

function getColorRequest({ host, name, device, colorValue }) {
  const url =
        `${host}/${name}/${device}/color/${colorValue[0]}/${colorValue[1]}/${colorValue[2]}`
  const request = {
    url,
    category: 'color',
    method: 'POST'
  }
  return request
}
function getEffectRequest({ host, name, device, value }) {
  const url =
        `${host}/${name}/${device}/effect/${value}`
  const request = {
    url,
    category: 'effect',
    method: 'POST'
  }
  return request
}
const requestConfig =
  {
    host: 'http://localhost:3000',
    name: 'rgb',
    device: 'light'
  }
bootstrap()
function main(sources) {

  const colorReqRes$ = sources.HTTP
    .select('color')
    .flatten()
    .map(res => `Color Applied:  ${res.text} `)
  const colorPicker = ColorPicker({
    DOM: sources.DOM,
    initValues: [199, 199, 199]
  })
  const colorPickerVDOM$ = colorPicker.DOM
  const colorPickerValue$ = colorPicker.value
  const colorRequest$ = colorPickerValue$
    .map(colorValue => Object.assign(requestConfig, { colorValue }))
    .map(getColorRequest)
  const effectSelect = EffectSelect({ DOM: sources.DOM, copy })
  const effectSelectVDOM$ = effectSelect.DOM
  const effectSelectValue$ = effectSelect.val
  const effectRequest$ = effectSelectValue$
    .map(effectValue => Object.assign(requestConfig, { value: effectValue }))
    .map(getEffectRequest)
  const componentOne = ComponentOne({ DOM: sources.DOM })
  const componentOneVDOM$ = componentOne.DOM
  const componentOneValue$ = componentOne.value
  const state$ = xs.combine(
    effectSelectValue$,
    componentOneValue$,
    colorPickerValue$,
    colorReqRes$,
  ).map(([
    effectSelectValue,
    componentOneValue,
    colorPickerValue,
    colorReqRes,
  ]) =>
    [
      effectSelectValue,
      componentOneValue,
      colorPickerValue,
      colorReqRes,
    ]).startWith([null])

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
  const request$ = xs.merge(colorRequest$, effectRequest$)
  return { DOM: vdom$, HTTP: request$ }
}
const drivers = {
  HTTP: makeHTTPDriver(),
  DOM: makeDOMDriver('#app-container')
}
run(main, drivers)
