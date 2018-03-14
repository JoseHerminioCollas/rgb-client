function getColorRequest({ host, port, name, device, colorValue }) {
  const url =
        `http://${host}:${port}/${name}/${device}/color/${colorValue[0]}/${colorValue[1]}/${colorValue[2]}`
  const request = {
    url,
    category: 'color',
    method: 'POST'
  }
  return request
}

module.exports = getColorRequest
