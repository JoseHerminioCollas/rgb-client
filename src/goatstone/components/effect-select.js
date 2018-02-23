/*
 EffectSelect : a component for selecting an effect from a series of choices
*/
import { h, input, label } from '@cycle/dom'

function EffectSelect(sources) {
  const inputClassName = '.effect'
  const copy = sources.copy
  const effects = [copy.effect.options.glow, copy.effect.options.chase, copy.effect.options.redBlue]
  const newValue$ = sources.DOM
    .select('[name=effect-choice]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(0)

  const state$ = newValue$
    .map(val => ({
      value: val,
      displayValue: effects[val]
    }))
    .remember()

  // should copy be another stream?????
  const vdom$ = state$.map(({ displayValue }) =>
    h('article', {}, [
      h('h3', { style: { fontWeight: 900 } }, [copy.effect.title,
        'ddd',
        h('span', { style: { color: 'black', fontSize: '.7em' } }, [' ', displayValue]),
      ]),
      label('', {}, [
        copy.effect.options.glow,
        input(inputClassName, { attrs: { type: 'radio', name: 'effect-choice', value: 0, selected: true } }),
      ]),
      label('', {}, [
        copy.effect.options.chase,
        input(inputClassName, { attrs: { type: 'radio', name: 'effect-choice', value: 1 } }),
      ]),
      label('', {}, [
        copy.effect.options.redBlue,
        input(inputClassName, { attrs: { type: 'radio', name: 'effect-choice', value: 2 } }),
      ]),
    ])
  )

  const sinks = {
    val: newValue$,
    DOM: vdom$
  }
  return sinks
}

export default EffectSelect
