function effectRequest({ host, port, name, device, value }) {
  const url =
        `http://${host}:${port}/${name}/${device}/effect/${value}`
  const request = {
    url,
    category: 'effect',
    method: 'POST'
  }
  return request
}

module.exports = effectRequest
