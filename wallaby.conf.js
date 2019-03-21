'use strict'

module.exports = function (wallaby) {
  return {
    files: [
      'modules/**/src/**/*.ts',
      'modules/**/fixtures.ts',
      '!modules/**/test/**/*.test.ts',
      '!modules/**/node_modules/**',
      '!modules/**/build/**',
    ],
    tests: [
      'modules/**/test/**/*test.ts',
      '!modules/**/node_modules/**',
      '!modules/**/build/**',
    ],
    filesWithNoCoverageCalculated: [
      'modules/**/src/index.ts'
    ],
    testFramework: 'mocha',
    env: { type: 'node' },
    setup: w => {
      const {projectCacheDir} = w
      const path = require('path')
      const {Module} = require('module')
      if (!Module._originalRequire) {
        const modulePrototype = Module.prototype
        Module._originalRequire = modulePrototype.require
        modulePrototype.require = function (filePath) {
          if (!filePath.startsWith('@npm-namespace')) {
            return Module._originalRequire.call(this, filePath)
          }
          const [, _module] = filePath.split('/')
          const _filePath = path.join(projectCacheDir, 'modules', _module, 'src', 'index.js')
          return Module._originalRequire.call(this, _filePath)
        }
      }
    },
    debug: true
  }
}
