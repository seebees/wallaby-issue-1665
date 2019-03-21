/* eslint-env mocha */

import { expect } from 'chai'
import 'mocha'
import { Identifier } from '../src/container'

describe('Identifier', () => {
  it('should be frozen', () => {
    expect(Object.isFrozen(Identifier)).to.eql(true)
  })
})
