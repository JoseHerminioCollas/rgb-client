/*
 ColorSlider : a component for selecting a color valule 0 - 255
*/
import xs from 'xstream'

function ColorSlider(sources) {
  const sOne$ = xs.periodic(1000)
  // pass the specific DOM element
  // sources.redSelectDOM sources.DOM
  const colorSelectRed$ = sources.DOM.select('.red')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(10)

  const sinks = {
    a: 1,
    s: sOne$,
    v: xs.of(255),
    src: sources,
    pStream: sources.parentStream,
    red: colorSelectRed$
  }
  return sinks
}

export default ColorSlider
