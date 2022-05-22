import counterReducer from "./reducer";
import deepFreeze from 'deep-freeze'

describe ('reducer', () => {
    test('returns new station with the action INCREMENT', () => {
        const state = 0
        const action = {type: 'INCREMENT'}

        deepFreeze(state)
        const newIncrement = counterReducer(state, action)

        expect(newIncrement).toEqual(1)
    })
})