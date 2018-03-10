const expect = require('chai').expect
const ColorRequest = require('../src/goatstone/requests/color')
const EffectRequest = require('../src/goatstone/requests/effect')

describe('Requests used in Cycle HTTP requests', () => {

  const config =
    {
      host: 'hostValue',
      name: 'nameValue',
      device: 'deviceValue'
    }  

  describe('ColorRequest', () => {
    let cr
    before(() => {
      Object.assign(config, {colorValue: 200})
      cr = ColorRequest(config)
    })
    it('should return an URL string with supplied values', () => {
      const expectedCategory = 'color'
      const expectedMethod = 'POST'
      expect(cr.url).to.include(config.host)
      expect(cr.url).to.include(config.name)
      expect(cr.url).to.include(config.device)
    })
    it('should return a category string with supplied values', () => {
      const expectedCategory = 'color'
      expect(cr.category).to.equal(expectedCategory)
    })
    it('should return a method string with supplied values', () => {
      const expectedMethod = 'POST'
      expect(cr.method).to.equal(expectedMethod)
    })
  })

  describe('EffectRequest', () => {
    let er
    before(() => {
      Object.assign(config, {effectValue: 'abc'})
      er = EffectRequest(config)
    })
    it('should return an URL string with supplied values', () => {
      const expectedCategory = 'color'
      const expectedMethod = 'POST'
      expect(er.url).to.include(config.host)
      expect(er.url).to.include(config.name)
      expect(er.url).to.include(config.device)
    })
    it('should return a category string with supplied values', () => {
      const expectedCategory = 'effect'
      expect(er.category).to.equal(expectedCategory)
    })
    it('should return a method string with supplied values', () => {
      const expectedMethod = 'POST'
      expect(er.method).to.equal(expectedMethod)
    })
  })

})
