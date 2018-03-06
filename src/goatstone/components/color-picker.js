/* ColorPicker
present 3 sliders representing colors red grean and blue
the 3 slider values will be compromise a single color value
*/
import xs from 'xstream'
import { h } from '@cycle/dom'

function ColorPicker(sources) {
  const value$ = xs.of(0)
  const state$ = xs.of({
    value: 0,
    red: sources.initValues[0],
    message: 'msg'
  })
  const vdom$ = state$.map(({ value, message, red }) =>
    h('article', {}, ['color picker', String(value), message, red]))

  return {
    DOM: vdom$,
    value: value$
  }
}

export default ColorPicker
