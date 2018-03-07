/* ColorPicker
present 3 sliders representing colors red grean and blue
the 3 slider values will be compromise a single color value
*/
import xs from 'xstream'
import { h } from '@cycle/dom'
import ColorSlider from './color-slider'

function ColorPicker(sources) {
  // color components need distinct selectors (DOM) in order to create distinct values
  const redColorSlider = ColorSlider(
    { DOM: sources.DOM,
      copy: { label: `Red` },
      selector: 'red-select' })
  const redColorSliderVDOM$ = redColorSlider.DOM
  const redColorSliderValue$ = redColorSlider.value

  const greenColorSlider = ColorSlider(
    { DOM: sources.DOM,
      copy: { label: 'Green' },
      selector: 'green-select' })
  const greenColorSliderVDOM$ = greenColorSlider.DOM
  const greenColorSliderValue$ = greenColorSlider.value

  const blueColorSlider = ColorSlider(
    { DOM: sources.DOM,
      copy: { label: 'Blue' },
      selector: 'blue-select' })
  const blueColorSliderVDOM$ = blueColorSlider.DOM
  const blueColorSliderValue$ = blueColorSlider.value

  const state$ = xs.combine(
    redColorSliderValue$, greenColorSliderValue$, blueColorSliderValue$)
    .map(([red, green, blue]) =>
      [red, green, blue])

  const vdom$ = xs.combine(
    state$,
    redColorSliderVDOM$,
    greenColorSliderVDOM$,
    blueColorSliderVDOM$
  ).map((
    [
      state,
      redColorSliderVDOM,
      greenColorSliderVDOM,
      blueColorSliderVDOM
    ]) =>
    h('article', {}, [
      'color picker',
      redColorSliderVDOM,
      greenColorSliderVDOM,
      blueColorSliderVDOM,
      JSON.stringify(state)
    ]))

  return {
    DOM: vdom$,
    value: xs.of(0)
  }
}

export default ColorPicker
