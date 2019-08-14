import * as db from './database.facade'

it('should return 2 implementations of auth', () => {
    expect(db.getAuthImplementations().length).toBe(2)
})