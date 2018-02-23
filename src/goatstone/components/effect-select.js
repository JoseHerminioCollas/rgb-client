/*
 EffectSelect : a component for selecting an effect from a series of choices
*/
import { h, input, label } from '@cycle/dom'

function EffectSelect(sources) {
  const inputClassName = '.effect'
  // TODO should copy be another stream?????
  const copy = sources.copy
  const effects = [copy.effect.options.glow, copy.effect.options.chase, copy.effect.options.redBlue]
  const startValue = null
  const newValue$ = sources.DOM
    .select('[name=effect-choice]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(startValue)
  const state$ = newValue$
    .map(val => ({
      value: val,
      displayValue: effects[val]
    }))
    .remember()
  const vdom$ = state$.map(({ value, displayValue }) =>
    h('article', {}, [
      h('h3', { style: { fontWeight: 900 } }, [copy.effect.title,
        h('span', { style: { color: 'black', fontSize: '.7em', fontWeight: 'normal' } }, [' ', displayValue]),
      ]),
      label('', {}, [
        copy.effect.options.glow,
        input(inputClassName, {
          attrs: { type: 'radio', name: 'effect-choice', value: 0, checked: value === 0 } }),
      ]),
      label('', {}, [
        copy.effect.options.chase,
        input(inputClassName, {
          attrs: { type: 'radio', name: 'effect-choice', value: 1, checked: value === 1 } }),
      ]),
      label('', {}, [
        copy.effect.options.redBlue,
        input(inputClassName, {
          attrs: { type: 'radio', name: 'effect-choice', value: 2, checked: value === 2 } }),
      ]),
    ])
  )
  return {
    val: newValue$,
    DOM: vdom$
  }
}
export default EffectSelect
