const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = {...state, good: state.good + 1}
      state = newGood
      return state
    case 'OK':
      const newOk = {...state, ok: state.ok + 1}
      state = newOk
      return state
    case 'BAD':
      const newBad = {...state, bad: state.bad + 1}
      state = newBad
      return state
    case 'ZERO':
      state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer