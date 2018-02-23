/*
 ComponentOne : a generic Cycle.js component
*/
import xs from 'xstream'
import { h } from '@cycle/dom'

function ComponentOne(sources) {

  const sOne$ = xs.periodic(1000)
  const newValue$ = sources.DOM
    .select('[data-id=component-one]')
    .events('click')
    .map(() => true)
    .startWith(false)
  const vdom$ = newValue$.map(val =>
    h('article', {}, [
      h('h4', {}, ['Component']),
      h('input', { attrs: { 'data-id': 'component-one', type: 'button', value: 'One' } }),
      String(val)
    ])
  )

  return {
    periodic: sOne$,
    simpleStream: xs.of(11),
    value: newValue$,
    DOM: vdom$
  }
}
export default ComponentOne
