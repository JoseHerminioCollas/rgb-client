function effectRequest({ host, name, device, value }) {
  const url =
        `${host}/${name}/${device}/effect/${value}`
  const request = {
    url,
    category: 'effect',
    method: 'POST'
  }
  return request
}

module.exports = effectRequest
