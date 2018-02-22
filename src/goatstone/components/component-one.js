/*
 ComponentOne : a generic Cycle.js component
*/
import xs from 'xstream'

function ComponentOne(sources) {
  const sOne$ = xs.periodic(1000)
  const sinks = {
    a: 1,
    s: sOne$,
    v: xs.of(11),
    src: sources,
    pStream: sources.parentStream
  }
  return sinks
}

export default ComponentOne
