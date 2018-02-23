/*
 EffectSelect : a component for selecting an effect from a series of choices
*/
import xs from 'xstream'
import { h, div, input, label } from '@cycle/dom'

function EffectSelect(sources) {
  const copy = sources.copy
  const newValue$ = sources.DOM
    .select('[name=effect-choice]')
    .events('change')
    .map(ev => ev.target.value)
    .startWith(0)
  const props$ = xs.of({ value: 0 })
  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        value: val,
      }))
      .startWith(props)
    )
    .flatten()
    .remember()

  // should copy be another stream?????
  const vdom$ = state$.map(({ value }) =>
    h('article', {}, [
      div(['Selected Value::: ', value]),
      h('h3', { style: { fontWeight: 900 } }, [copy.effect.title]),
      label('', {}, [
        copy.effect.options.glow,
        input('.b', { attrs: { type: 'radio', name: 'effect-choice', value: 0 } }),
      ]),
      label('', {}, [
        copy.effect.options.chase,
        input('.b', { attrs: { type: 'radio', name: 'effect-choice', value: 1 } }),
      ]),
      label('', {}, [
        copy.effect.options.redBlue,
        input('.b', { attrs: { type: 'radio', name: 'effect-choice', value: 2 } }),
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
