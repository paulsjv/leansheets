// For testing code that has different code paths for different environments read 
// the below link and implement the solution.  This test shows how to do it correctly
// in VSCode since the debugger loads the .env.development file.
// https://stackoverflow.com/questions/48033841/test-process-env-with-jest/48042799

let log = null
const OLD_ENV = process.env


beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache
    process.env = { ...OLD_ENV }
    delete process.env.REACT_APP_DEBUG_ENABLED
})

afterEach(() => {
    process.env = OLD_ENV
    log = null
})

it('expects log to be an empty instance', () => {
    const expected = { debug: expect.any(Function), error: expect.any(Function), trace: expect.any(Function) }
    log = require('./logger')
    expect(log.default).toEqual(expected)
})

it('expects log to be an instance of console', () => {
    process.env.REACT_APP_DEBUG_ENABLED = 'true'
    log = require('./logger')
    expect(log.default).toEqual(console)
})